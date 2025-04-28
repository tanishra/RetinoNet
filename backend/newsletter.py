# backend/newsletter.py
from flask import Blueprint, request, jsonify
import csv
import os

newsletter_bp = Blueprint('newsletter', __name__)
NEWSLETTER_FILE = 'newsletter_subscribers.csv'

@newsletter_bp.route('/api/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({'error': 'Email is required'}), 400

    # Save to CSV
    file_exists = os.path.isfile(NEWSLETTER_FILE)
    with open(NEWSLETTER_FILE, 'a', newline='') as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(['email'])
        writer.writerow([email])

    return jsonify({'message': 'Subscribed successfully'}), 200
