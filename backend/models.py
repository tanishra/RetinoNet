from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    
    # Define the relationship with the Report model
    reports = db.relationship('Report', backref='user', lazy=True)

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_filename = db.Column(db.String(120), nullable=False)
    prediction_result = db.Column(db.String(120), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    # Foreign key to link the report to the User
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)