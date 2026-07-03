from flask import Flask, render_template, request, jsonify
import time
import smtplib
from email.mime.text import MIMEText
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')
    
    # Simulate processing delay
    time.sleep(1.5)
    
    # Server-side validation
    if not all([name, email, subject, message]) or len(message) < 20:
        return jsonify({'status': 'error', 'message': 'Invalid data provided.'}), 400
        
    print(f"\n--- New Message Received! ---\nFrom: {name} ({email})\nSubject: {subject}\nMessage: {message}\n-----------------------------\n")
    
    # Email configuration
    receiver_email = "goldenkrsingh921@gmail.com"
    sender_email = os.environ.get('EMAIL_USER', "goldenkrsingh921@gmail.com")
    sender_password = os.environ.get('EMAIL_PASS') # Use an App Password if using Gmail
    
    if sender_password:
        msg = MIMEText(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}")
        msg['Subject'] = f"Portfolio Contact: {subject}"
        msg['From'] = sender_email
        msg['To'] = receiver_email
        
        try:
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
                smtp_server.login(sender_email, sender_password)
                smtp_server.send_message(msg)
            print("Email sent successfully!")
        except Exception as e:
            print(f"Failed to send email: {e}")
            return jsonify({'status': 'error', 'message': 'Failed to send email. Please try again later.'}), 500
    else:
        print("Warning: EMAIL_PASS environment variable not set. Email was not sent.")
    
    return jsonify({'status': 'success', 'message': 'Message sent successfully!'})

if __name__ == '__main__':
    from livereload import Server
    app.debug = True
    server = Server(app.wsgi_app)
    server.watch('static/**/*.*')
    server.watch('templates/**/*.*')
    server.serve(port=5000, host='127.0.0.1')
