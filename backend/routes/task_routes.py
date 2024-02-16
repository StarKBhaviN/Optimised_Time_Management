from models.tasks import Tasks
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

task_add_bp = Blueprint('task_add_bp', __name__)

@task_add_bp.route("/api/tasks/task_add", methods=["POST"])
@jwt_required()
def add_task():
    try:
        from config.database_connection import MongoDB
        mongodb = MongoDB()
        db = mongodb.get_db("Opt_Time_Management")

        task_data = request.json
        token = get_jwt_identity() 

        task = Tasks(
            title=task_data["Title"],
            due_date=task_data["Due_date"],
            importance=task_data["Importance"],
            urgency=task_data["Urgency"]
        )
        print(token)
        task.add_task(db, token) 

        return jsonify({"message": "Task Added Successfully"}), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
