from flask import Flask
from config.database_connection import MongoDB
from routes.user_routes import user_create_bp,user_login_bp
from routes.task_routes import task_add_bp
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/Opt_Time_Management"

app.config['JWT_SECRET_KEY'] = 'bha$vi!n'  # Change this to a secure random key in production
jwt = JWTManager(app)

# Initialize MongoDB client
mongodb = MongoDB()
mongodb.init_app(app)

# Routes registration USER
app.register_blueprint(user_create_bp)
app.register_blueprint(user_login_bp)

# Routes registration TASKS
app.register_blueprint(task_add_bp)
# app.register_blueprint(user_login_bp)

@app.route('/')
def index():
    try:
        return "Hello Python !!!"
    except Exception as e:
        return f"An error occurred: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True)
