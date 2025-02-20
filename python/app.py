from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import bcrypt

app = Flask(__name__)
CORS(app,origins=["https://13.232.100.187:3000"])  # Allow React frontend to communicate with Flask backend

# MySQL Database Connection
db = mysql.connector.connect(
    host="172.31.1.193",
    user="myuser",
    password="mypassword",
    database="mydatabase"
)
cursor = db.cursor()

# User Registration API
@app.route('/register', methods=['POST','GET'])
def register():
    data = request.json
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
                   (data['name'], data['email'], hashed_password))
    db.commit()
    return jsonify({"message": "User registered successfully"}), 201



@app.route('/', methods=['GET'])
def home():
    return "Hello, Flask is running on Gunicorn!"

# User Login API
@app.route('/login', methods=['POST','GET'])
def login():
    data = request.json
    cursor.execute("SELECT * FROM users WHERE email=%s", (data['email'],))
    user = cursor.fetchone()
    
    if user and bcrypt.checkpw(data['password'].encode('utf-8'), user[3].encode('utf-8')):
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"error": "Invalid credentials"}), 401
#if __name__ == '__main__':
 #   app.run(host='0.0.0.0', port=5001)