from flask import Flask, request, jsonify, render_template, send_from_directory, session, g
from flask_cors import CORS

from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import os

project_dir = os.path.dirname(os.path.abspath(__file__))
dbfile="sqlite:///{}".format(os.path.join(project_dir, "mySql.db"))
app = Flask(__name__, static_folder='dist', static_url_path='/')

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = dbfile
db=SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id=db.Column(db.Integer, unique=True, nullable=False, primary_key=True)
    full_name=db.Column(db.String(80), unique=True, nullable=False)
    email=db.Column(db.String(80), unique=True, nullable=False)
    password=db.Column(db.String(255), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.full_name}'
    
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return send_from_directory("dist", "index.html")

@app.route('/register', methods=['GET', 'POST'])
def register():

    try:
        data = request.get_json(force=True)  # ✅ Force JSON parsing
        full_name = data.get("full_name")
        email = data.get("email")
        password = data.get("password")

        exiting_user = User.query.filter_by(email=email).first()
        if exiting_user:
            return "User already exists, Try Logging in!!"

        if not full_name or not email or not password:
            return jsonify({"error": "Missing required fields"}), 400
        
        last_user = User.query.order_by(User.id.desc()).first()
        new_id = 101 if last_user is None else last_user.id + 1

        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(id=new_id, full_name=full_name,email=email,password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully!"}), 201

    except Exception as e:
        return jsonify({"error": f"Invalid JSON data: {str(e)}"}), 400

# User Login API
@app.route('/login', methods=['POST','GET'])
def login():
    data = request.json
    all_data = User.query.all()
    for item in all_data:
        print("user details", item.id, item.full_name, item.email, item.password)
    
    user = User.query.filter_by(email=data['email']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"error": "Invalid credentials"}), 401

if __name__ == '__main__':
   app.run(debug=True)