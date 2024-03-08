from flask import Flask
from flask_cors import CORS
from config.database_connection import MongoDB
from routes.user_routes import user_create_bp,user_login_bp,user_info_bp
from routes.task_routes import task_add_bp,task_delete_bp,get_tasks_bp,task_update_bp
from flask_jwt_extended import JWTManager
import datetime

# Flask app configuration
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
app.config["MONGO_URI"] = "mongodb://localhost:27017/Opt_Time_Management"

# JWT Token management
app.config['JWT_SECRET_KEY'] = 'bha$vi!n'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)
jwt = JWTManager(app)

# Initialize MongoDB client
mongodb = MongoDB()
mongodb.init_app(app)

# Routes registration USER
app.register_blueprint(user_create_bp)
app.register_blueprint(user_login_bp)
app.register_blueprint(user_info_bp)

# Routes registration TASKS
app.register_blueprint(task_add_bp)
app.register_blueprint(get_tasks_bp)
app.register_blueprint(task_delete_bp)
app.register_blueprint(task_update_bp)

# Test route
@app.route('/')
def index():
    try:
        return "Hello Python !!!"
    except Exception as e:
        return f"An error occurred: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True)
