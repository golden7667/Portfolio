from flask import Flask, render_template, request, jsonify
import time

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
    
    return jsonify({'status': 'success', 'message': 'Message sent successfully!'})

if __name__ == '__main__':
    app.run(debug=True)
