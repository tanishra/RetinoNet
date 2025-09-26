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


# ---------- INIT DB AND RUN ----------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5001, debug=True)
