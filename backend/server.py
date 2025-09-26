from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Report
import os
import torch
import torch.nn as nn
import timm
from torchvision import transforms, models
from PIL import Image
from flask_migrate import Migrate
from datetime import datetime


app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db.init_app(app)

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# ---------- SIGNIN ----------
@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        return jsonify({
            'success': True,
            'message': 'Signin successful',
            'user': {
                'id': user.id,
                'email': user.email
            }
        }), 200
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

# ---------- HISTORY ----------
@app.route('/history', methods=['POST'])
def get_history():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'success': False, 'message': 'Email is required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'success': False, 'message': 'User not found'}), 404

    reports = Report.query.filter_by(user_id=user.id).all()
    if not reports:
        return jsonify({'success': False, 'message': 'No reports found'}), 404

    history = [{
        'image_filename': r.image_filename,
        'prediction_result': r.prediction_result,
        'timestamp': r.timestamp.strftime('%Y-%m-%d %H:%M:%S')
    } for r in reports]

    return jsonify({'success': True, 'email': email, 'history': history}), 200


# ---------- SUBSCRIBE ----------
@app.route('/subscribe', methods=['POST'])
def subscribe():
    try:
        data = request.get_json()
        email = data.get('email')
        if not email:
            return jsonify({'message': 'Email is required'}), 400

        print(f"Subscribed with email: {email}")
        return jsonify({'message': 'Subscription successful'}), 200
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

# ---------- ALLOWED FILE TYPES ----------
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# ---------- MODEL SETUP ----------
LEARNING_RATE = 1e-4
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
checkpoint_path = "Mobile_Pit_last_checkpoint.pt"

Model_P = "pit_b_224"

Model_Mobile = models.mobilenet_v2(pretrained=True)
num_features_mobile = Model_Mobile.classifier[1].in_features
Model_Mobile.classifier = nn.Identity()

Model_pit = timm.create_model(Model_P, pretrained=True, num_classes=5)
num_features_pit = Model_pit.head.in_features
Model_pit.head = nn.Identity()

class CombinedModel(nn.Module):
    def __init__(self, Model_Mobile, Model_pit, num_classes):
        super(CombinedModel, self).__init__()
        self.Model_Mobile = Model_Mobile
        self.Model_pit = Model_pit
        self.fc = nn.Linear(num_features_mobile + num_features_pit, num_classes)

    def forward(self, x):
        mobile_features = self.Model_Mobile(x)
        pit_features = self.Model_pit(x)

        if len(mobile_features.shape) > 2:
            mobile_features = mobile_features.flatten(1)
        if len(pit_features.shape) > 2:
            pit_features = pit_features.flatten(1)

        combined = torch.cat((mobile_features, pit_features), dim=1)
        return self.fc(combined)

model_co = CombinedModel(Model_Mobile, Model_pit, num_classes=5).to(device)

def load_model_from_checkpoint(checkpoint_path, device):
    checkpoint = torch.load(checkpoint_path, map_location=device)
    model_co.load_state_dict(checkpoint["model_state_dict"])
    model_co.to(device)
    model_co.eval()
    return model_co

model = load_model_from_checkpoint(checkpoint_path, device)
class_names = ['No_DR', 'Mild', 'Moderate', 'Severe', 'Proliferate_DR']

# ---------- PREDICTION FUNCTION ----------
def predict_image(img, model, device):
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406],
                             [0.229, 0.224, 0.225])
    ])

    img_tensor = transform(img).unsqueeze(0).to(device)
    model.eval()

    with torch.no_grad():
        outputs = model(img_tensor)
        pred_class = torch.argmax(outputs, dim=1).item()

    return pred_class, class_names[pred_class]

# ---------- PREDICT ROUTE ----------
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'success': False, 'message': 'Missing image file'}), 400

    # Get the file from the form data
    file = request.files['image']
    
    if file.filename == '' or not allowed_file(file.filename):
        return jsonify({'success': False, 'message': 'Invalid file type'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    try:
        # Debugging print for file path
        print(f"File saved at: {filepath}")
        
        # Open and process the image
        image = Image.open(filepath).convert("RGB")
        pred_index, prediction_label = predict_image(image, model, device)

        # Debugging print for prediction
        print(f"Prediction: {prediction_label}")

        # Return the result with prediction
        return jsonify({
            'success': True,
            'message': 'Prediction completed',
            'prediction': prediction_label
        }), 200

    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return jsonify({'success': False, 'message': 'Error during prediction'}), 500

# @app.route('/predict', methods=['POST'])
# def predict():
#     if 'image' not in request.files:
#         return jsonify({'success': False, 'message': 'Missing image file'}), 400

#     # Get the email from form data
#     email = request.form.get('email')  # Should be part of the form-data
    
#     if not email:
#         return jsonify({'success': False, 'message': 'Email is required'}), 400
    
#     # Debugging print statement for email
#     print(f"Received email: {email}")
    
#     # Get the file from the form data
#     file = request.files['image']
    
#     if file.filename == '' or not allowed_file(file.filename):
#         return jsonify({'success': False, 'message': 'Invalid file type'}), 400

#     filename = secure_filename(file.filename)
#     filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#     file.save(filepath)

#     try:
#         # Debugging print for file path
#         print(f"File saved at: {filepath}")
        
#         # Open and process the image
#         image = Image.open(filepath).convert("RGB")
#         pred_index, prediction_label = predict_image(image, model, device)

#         # Debugging print for prediction
#         print(f"Prediction: {prediction_label}")

#         # Return the result with email and prediction
#         return jsonify({
#             'success': True,
#             'message': 'Prediction completed',
#             'prediction': prediction_label,
#             'email': email
#         }), 200

#     except Exception as e:
#         print(f"Prediction error: {str(e)}")
#         return jsonify({'success': False, 'message': 'Error during prediction'}), 500

# @app.route('/predict', methods=['POST'])
# def predict():
#     if 'image' not in request.files:
#         return jsonify({'success': False, 'message': 'Missing image file'}), 400

#     # Get the email from form data
#     email = request.form.get('email')  # Should be part of the form-data

#     if not email:
#         return jsonify({'success': False, 'message': 'Email is required'}), 400

#     # Debugging print statement for email
#     print(f"Received email: {email}")

#     # Get the file from the form data
#     file = request.files['image']

#     if file.filename == '' or not allowed_file(file.filename):
#         return jsonify({'success': False, 'message': 'Invalid file type'}), 400

#     filename = secure_filename(file.filename)
#     filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#     file.save(filepath)

#     try:
#         # Debugging print for file path
#         print(f"File saved at: {filepath}")

#         # Open and process the image
#         image = Image.open(filepath).convert("RGB")
#         print(f"Image opened successfully: {image.size}")

#         # Predict image
#         pred_index, prediction_label = predict_image(image, model, device)

#         # Debugging print for prediction
#         print(f"Prediction: {prediction_label}")

#         # Get the current timestamp
#         timestamp = datetime.now()

#         # Find user by email and create a new report
#         user = User.query.filter_by(email=email).first()
#         if user:
#             # Save the image file and prediction result with timestamp to the database
#             new_report = Report(user_id=user.id, image_filename=filename, 
#                                 prediction_result=prediction_label, timestamp=timestamp)
#             db.session.add(new_report)
#             db.session.commit()
#         else:
#             return jsonify({'success': False, 'message': 'User not found'}), 404

#         # Return the result with email and prediction
#         return jsonify({
#             'success': True,
#             'message': 'Prediction completed',
#             'prediction': prediction_label,
#             'email': email,
#             'timestamp': timestamp.strftime('%Y-%m-%d %H:%M:%S')  # Formatting timestamp
#         }), 200

#     except Exception as e:
#         print(f"Error during prediction: {str(e)}")  # Print the exact error message
#         return jsonify({'success': False, 'message': f"Error during prediction: {str(e)}"}), 500




# ---------- INIT DB AND RUN ----------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5001, debug=True)
