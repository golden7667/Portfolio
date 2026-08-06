from flask import Flask, render_template, request, jsonify, send_file
import time
import smtplib
from email.mime.text import MIMEText
from datetime import datetime
import os
import math
import random


app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')




@app.route('/api/3d-background-nodes')
def get_3d_bg_nodes():
    """Calculates 3D Cyan Geodesic Wireframe Polyhedron, node vertices, and 350+ glowing cyan & blue particles in Python."""
    
    # 1. 3D Geodesic Polyhedron Wireframe Mesh Metrics calculated in Python
    polyhedron = {
        'radius': 16.5,
        'detail': 2,
        'pos': [-20.0, 4.0, -12.0],
        'spin': [0.003, 0.006],
        'color': '#38bdf8',
        'nodeColor': '#06b6d4'
    }
    
    # 2. Calculate 350+ Glowing Cyan & Electric Blue Depth Particles in Python
    particles = []
    num_particles = 350
    colors = ['#38bdf8', '#818cf8', '#3b82f6', '#06b6d4', '#60a5fa', '#93c5fd']
    
    for i in range(num_particles):
        x = round(random.uniform(-75, 75), 2)
        y = round(random.uniform(-60, 60), 2)
        z = round(random.uniform(-65, 30), 2)
        size = round(random.uniform(0.18, 0.45), 2)
        color = colors[i % len(colors)]
        pulse_phase = round(random.uniform(0, math.pi * 2), 3)
        
        particles.append({
            'pos': [x, y, z],
            'size': size,
            'color': color,
            'phase': pulse_phase
        })

    return jsonify({
        'status': 'success',
        'polyhedron': polyhedron,
        'particleCount': len(particles),
        'particles': particles
    })






@app.route('/api/3d-portfolio-components')
def get_3d_components():
    """Calculates 3D spatial depth coordinates, 3D pop-out matrices, and tilt parameters for all portfolio cards in Python."""
    components = {
        'avatar': {
            'perspective': 1200,
            'maxTilt': 20,
            'popDepth': 45,
            'ringSpeed': 0.8,
            'colorGlow': '#6366f1'
        },
        'skills': {
            'perspective': 1000,
            'maxTilt': 15,
            'popDepth': 35,
            'cardZ': 25,
            'iconZ': 45
        },
        'achievements': {
            'perspective': 1100,
            'maxTilt': 18,
            'popDepth': 40,
            'statZ': 50
        },
        'projects': {
            'perspective': 1200,
            'maxTilt': 16,
            'popDepth': 38,
            'imageZ': 30,
            'badgeZ': 42,
            'btnZ': 50
        },
        'experience': {
            'perspective': 1000,
            'maxTilt': 12,
            'popDepth': 30
        },
        'contact': {
            'perspective': 1100,
            'maxTilt': 14,
            'popDepth': 35
        }
    }
    return jsonify({
        'status': 'success',
        'engine': 'Python 3D Spatial Component Engine',
        'components': components
    })

@app.route('/api/portfolio-data')
def get_portfolio_data():
    """Serves 100% of portfolio text content, skill lists, project showcases, and statistics from Python data dictionaries."""
    data = {
        'personal': {
            'name': 'Golden Kumar',
            'title': 'Machine Learning Engineer & Frontend Developer',
            'roles': ["Machine Learning Engineer", "Python Developer", "Frontend Developer", "Problem Solver"],
            'bio': 'Passionate about machine learning and frontend development. Building innovative solutions with modern technologies while maintaining a positive mindset.',
            'email': 'goldenkrsingh921@gmail.com',
            'location': 'Jaipur, Rajasthan, India',
            'university': 'Vivekananda Global University, Jaipur',
            'cgpa': '7.12',
            'social': {
                'linkedin': 'https://linkedin.com/in/golden-kr-singh',
                'github': 'https://github.com/golden7667',
                'instagram': 'https://www.instagram.com/its_gold_d_roger?igsh=MXF2bm1tOThlb3V2MQ%3D%3D&utm_source=qr'
            }
        },
        'aboutStats': [
            {'value': '2+', 'label': 'Internships'},
            {'value': '5+', 'label': 'Projects'},
            {'value': '100%', 'label': 'Dedication'},
            {'value': '7.12', 'label': 'CGPA'}
        ],
        'achievements': [
            {'stat': '50+', 'label': 'DSA Problems Solved', 'color': 'blue-400'},
            {'stat': '3+', 'label': 'Projects Completed', 'color': 'purple-400'},
            {'stat': '8+', 'label': 'Technologies Learned', 'color': 'emerald-400'}
        ],
        'projects': [
            {
                'id': 1,
                'title': '3D Interactive Portfolio App',
                'tech': 'Flask, Three.js, Python Math Engine, Tailwind CSS',
                'desc': 'Interactive 3D WebGL portfolio with real-time Python parametric surface visualizers and multi-layered 3D perspective tilt.',
                'image': 'profile.jpg',
                'category': 'Web & 3D'
            },
            {
                'id': 2,
                'title': 'Face Recognition Attendance System',
                'tech': 'Python, OpenCV, Scikit-learn, SQLite',
                'desc': 'Automated biometric attendance tracking system leveraging real-time facial recognition algorithms.',
                'image': 'face_recognition_attendance.jpg',
                'category': 'Machine Learning'
            },
            {
                'id': 3,
                'title': 'College ERP & Management System',
                'tech': 'Flask, MySQL, JavaScript, HTML5/CSS3',
                'desc': 'Comprehensive ERP platform managing student academic records, faculty portals, and automated grade calculations.',
                'image': 'college_erp_system.png',
                'category': 'Full-Stack Web'
            },
            {
                'id': 4,
                'title': 'Steel Mechanical Properties Prediction',
                'tech': 'Python, Pandas, Scikit-learn, Matplotlib',
                'desc': 'Predictive ML model utilizing regression algorithms to forecast tensile strength and yield stress of steel alloys.',
                'image': 'steel_properties_prediction.png',
                'category': 'Data Science'
            }
        ]
    }
    return jsonify({
        'status': 'success',
        'engine': 'Python Portfolio Central Data Engine',
        'data': data
    })






@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.get_json()
    
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    subject = data.get('subject', '').strip()
    message = data.get('message', '').strip()
    
    # Server-side validation
    if not all([name, email, subject, message]) or len(message) < 15:
        return jsonify({'status': 'error', 'message': 'Please fill all fields with a valid message.'}), 400
        
    timestamp = datetime.now().strftime("%Y-%m-%d %I:%M:%S %p")
    target_email = "goldenkrsingh921@gmail.com"
    target_phone = "+91 7667711403"
    
    print("\n=======================================================")
    print("📩 NEW PORTFOLIO CONTACT FORM SUBMISSION RECEIVED!")
    print(f"Time: {timestamp}")
    print(f"From: {name} <{email}>")
    print(f"Subject: {subject}")
    print(f"Message: {message}")
    print(f"Target Email: {target_email}")
    print(f"Target Phone: {target_phone}")
    print("=======================================================\n")
    
    email_status = "logged"
    sms_status = "logged"
    
    # 1. Email Notification Dispatch (goldenkrsingh921@gmail.com)
    sender_email = os.environ.get('EMAIL_USER', target_email)
    sender_password = os.environ.get('EMAIL_PASS')
    
    if sender_password:
        try:
            from email.mime.multipart import MIMEMultipart
            from email.mime.text import MIMEText
            
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f"🔔 New Portfolio Message: {subject} (from {name})"
            msg['From'] = sender_email
            msg['To'] = target_email
            
            text_content = f"New Portfolio Message\n\nName: {name}\nEmail: {email}\nTime: {timestamp}\nSubject: {subject}\n\nMessage:\n{message}"
            html_content = f"""
            <html>
              <body style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 12px; padding: 24px; border: 1px solid #334155;">
                  <h2 style="color: #38bdf8; margin-top: 0;">🚀 New Portfolio Contact Submission</h2>
                  <p><strong>Sender:</strong> {name} (&lt;<a href="mailto:{email}" style="color: #818cf8;">{email}</a>&gt;)</p>
                  <p><strong>Subject:</strong> {subject}</p>
                  <p><strong>Time:</strong> {timestamp}</p>
                  <div style="background: #0f172a; border-left: 4px solid #818cf8; padding: 16px; margin: 16px 0; border-radius: 6px;">
                    <p style="margin: 0; white-space: pre-wrap;">{message}</p>
                  </div>
                  <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;" />
                  <p style="font-size: 12px; color: #94a3b8; text-align: center;">Golden Kumar Portfolio Notification System</p>
                </div>
              </body>
            </html>
            """
            
            msg.attach(MIMEText(text_content, 'plain'))
            msg.attach(MIMEText(html_content, 'html'))
            
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
                smtp_server.login(sender_email, sender_password)
                smtp_server.send_message(msg)
            email_status = "sent"
            print("✅ EMAIL DISPATCH SUCCESS: Sent to goldenkrsingh921@gmail.com")
        except Exception as e:
            print(f"⚠️ Email dispatch error: {e}")
            email_status = f"failed ({e})"
    else:
        print("ℹ️ EMAIL NOTE: Set EMAIL_PASS env var to send live emails via Gmail SMTP.")
        
    # 2. SMS Notification Dispatch (+91 7667711403)
    twilio_sid = os.environ.get('TWILIO_ACCOUNT_SID')
    twilio_token = os.environ.get('TWILIO_AUTH_TOKEN')
    twilio_from = os.environ.get('TWILIO_PHONE_NUMBER')
    
    sms_body = f"📩 Portfolio Alert from {name} ({email}): {subject} - Message: {message[:100]}"
    
    if twilio_sid and twilio_token and twilio_from:
        try:
            import importlib
            twilio_rest = importlib.import_module('twilio.rest')
            client = twilio_rest.Client(twilio_sid, twilio_token)
            sms_message = client.messages.create(
                body=sms_body,
                from_=twilio_from,
                to=target_phone
            )
            sms_status = "sent"
            print(f"✅ SMS DISPATCH SUCCESS: Sent to {target_phone} (SID: {sms_message.sid})")
        except Exception as e:
            print(f"⚠️ SMS dispatch error: {e}")
            sms_status = f"failed ({e})"
    else:
        print(f"📱 SMS DISPATCH LOG: Alert for {target_phone} -> '{sms_body}'")
        print("ℹ️ SMS NOTE: Set TWILIO_ACCOUNT_SID & TWILIO_AUTH_TOKEN env vars to send live SMS.")
        
    return jsonify({
        'status': 'success',
        'message': 'Your message has been sent successfully!',
        'details': {
            'targetEmail': target_email,
            'targetPhone': target_phone,
            'emailStatus': email_status,
            'smsStatus': sms_status
        }
    })


if __name__ == '__main__':
    from livereload import Server
    app.debug = True
    server = Server(app.wsgi_app)
    server.watch('static/**/*.*')
    server.watch('templates/**/*.*')
    server.serve(port=5000, host='127.0.0.1')
