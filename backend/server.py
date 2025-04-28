from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Report
from predict import predict_diabetic_retinopathy
from newsletter import newsletter_bp
import os

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all for testing (change this in production)
# CORS(app) 
CORS(app, origins=["http://localhost:5173"])

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db.init_app(app)

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# ---------- SIGNUP ----------
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'success': False, 'message': 'Email and password required'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'success': False, 'message': 'User already exists'}), 409

    hashed_pw = generate_password_hash(data['password'])
    new_user = User(email=data['email'], password=hashed_pw)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'success': True, 'message': 'User registered successfully'}), 201

# ---------- LOGIN ----------
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        return jsonify({'success': True, 'message': 'Login successful', 'user_id': user.id}), 200
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

# ---------- PREDICT ----------
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files or 'user_id' not in request.form:
        return jsonify({'success': False, 'message': 'Missing image or user ID'}), 400

    file = request.files['image']
    user_id = request.form['user_id']

    if file.filename == '' or not allowed_file(file.filename):
        return jsonify({'success': False, 'message': 'Invalid file type'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    try:
        prediction_label = predict_diabetic_retinopathy(filepath)

        report = Report(user_id=user_id, image_filename=filename, prediction_result=prediction_label)
        db.session.add(report)
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Prediction completed',
            'prediction': prediction_label
        }), 200

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'success': False, 'message': 'Error during prediction'}), 500

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


@app.route('/subscribe', methods=['POST'])
def subscribe():
    try:
        data = request.get_json()  # Get the JSON data sent from the frontend
        email = data.get('email')
        if not email:
            return jsonify({'message': 'Email is required'}), 400

        # Implement the subscription logic (e.g., save the email to a database)
        # For simplicity, let's assume the subscription was successful
        print(f"Subscribed with email: {email}")
        
        return jsonify({'message': 'Subscription successful'}), 200  # Respond with success message
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500


app.register_blueprint(newsletter_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5001, debug=True)
