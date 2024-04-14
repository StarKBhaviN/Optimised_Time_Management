from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from passlib.hash import sha256_crypt
from flask_jwt_extended import create_access_token

# Blueprint for creating a new user
user_create_bp = Blueprint('user_create_bp', __name__)

@user_create_bp.route("/api/user/create_user", methods=["POST"])
def add_user():
    try:
        from config.database_connection import MongoDB
        mongodb = MongoDB()
        db = mongodb.get_db("Opt_Time_Management")

        user_data = request.json

        # Validate user input
        required_fields = ["Name", "Email", "Gender", "Password", "phNo", "Hobby"]
        for field in required_fields:
            if field not in user_data:
                return jsonify({"error": f"Field '{field}' is required"}), 400

        # Additional validations for specific fields
        if not user_data["Name"].strip():
            return jsonify({"error": "Name cannot be empty"}), 400

        if user_data["Gender"] not in ["Male", "Female", "Other"]:
            return jsonify({"error": "Invalid gender. Gender must be Male, Female, or Other"}), 400

        if len(user_data["Password"]) < 6:
            return jsonify({"error": "Password must be at least 6 characters long"}), 400

        if len(user_data["phNo"]) != 10:
            return jsonify({"error": "Phone number must be 10 digits long"}), 400
        
        existing_user = db.Users.find_one({"Email" : user_data["Email"]})

        if existing_user:
            return jsonify({"error" : "User with this Email already exists."}), 409
        
        # Password hashing
        hash_pass = sha256_crypt.encrypt(user_data["Password"])

        # Create User object
        user = User(
            name=user_data["Name"],
            email=user_data["Email"],
            gender=user_data["Gender"],
            password=hash_pass,
            phNo=user_data["phNo"],
            hobby=user_data["Hobby"]
        )

        # Save user to database
        user_id = user.create_user(db)

        # Generate access token for the newly created user
        access_token = create_access_token(identity=user_id)

        return jsonify({"message": "User added successfully", "access_token": access_token}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Blueprint for user login
user_login_bp = Blueprint('user_login_bp', __name__)

@user_login_bp.route('/api/user/login',methods=["POST"])
def login():
    try:
        from config.database_connection import MongoDB
        mongodb = MongoDB()
        db = mongodb.get_db("Opt_Time_Management")

        user_data = request.json

        # Validate user input
        required_fields = ["Email", "Password"]
        for field in required_fields:
            if field not in user_data:
                return jsonify({"error": f"Field '{field}' is required"}), 400

        existing_user = db.Users.find_one({"Email" : user_data["Email"]})
        
        if not existing_user:
            return jsonify({"error" : "Incorrect Login credentials."}), 401

        pass_compare = sha256_crypt.verify(user_data["Password"], existing_user["Password"])
                                        
        if not pass_compare:
            return jsonify({"error" : "Incorrect Login credentials."}), 401

        # Generate access token for the user
        access_token = create_access_token(identity=existing_user["_id"])

        return jsonify({"message": "User logged in successfully", "access_token": access_token}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Blueprint for getting user information
user_info_bp = Blueprint('user_info_bp', __name__)

@user_info_bp.route('/api/user/info', methods=["GET"])
@jwt_required()  # Requires a valid access token
def get_user_info():
    try:
        from config.database_connection import MongoDB
        user_id = get_jwt_identity()

        mongodb = MongoDB()
        db = mongodb.get_db("Opt_Time_Management")
        user = db.Users.find_one({"_id": user_id}, {"password": 0})

        if user:
            user.pop('password', None)  # Remove password from user info
            return jsonify(user), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
