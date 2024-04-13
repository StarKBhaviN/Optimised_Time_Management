# ROUTES related to task adding, updating, deleting

from models.tasks import Tasks
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId,json_util
from datetime import datetime

# ROUTE_1 : [POST] - Add tasks in tasks collection of database (LOGIN required)
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
            urgency=task_data["Urgency"],
            description=task_data["Description"],
            Notification_period=task_data["Notification_period"]
        )
        
        task.add_task(db, token) 

        return jsonify({"message": "Task Added Successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ROUTE_2 : [GET] - GET all task related to particular user only (LOGIN required)
get_tasks_bp = Blueprint('get_tasks_bp',__name__)

@get_tasks_bp.route("/api/tasks/get_all_tasks", methods=["GET"])
@jwt_required()
def get_all_tasks():
    try:
        from config.database_connection import MongoDB
        mongodb = MongoDB()
        db = mongodb.get_db("Opt_Time_Management")

        token = get_jwt_identity() 

        tasks = db.Tasks.find({"User_ID" : token})
        # Convert string dates to datetime objects
        # tasks = [task for task in tasks if task["Due_date"]]  # Filter out tasks with empty due dates
        # tasks = sorted(tasks, key=lambda x: datetime.strptime(x["Due_date"], "%Y-%m-%d"))

        tasks_json = json_util.dumps(tasks)
        
        return tasks_json,200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ROUTE_3 : [DELETE] - Deletes a task with selected TaskID (LOGIN required)
task_delete_bp = Blueprint('task_delete_bp', __name__)

@task_delete_bp.route("/api/tasks/task_del/<id>", methods=["DELETE"])
@jwt_required()
def task_delete(id):
    try:
        from config.database_connection import MongoDB
        mongodb = MongoDB()
        db = mongodb.get_db("Opt_Time_Management")

        token = get_jwt_identity() 
        print("User :",token)
        
        task_id = ObjectId(id)
        print("Task to be deleted :",task_id)
        
        result = db.Tasks.delete_one({"_id": task_id, "User_ID": token})

        if result.deleted_count == 1:
            return jsonify({"message": "Task deleted successfully"}), 200
        else:
            return jsonify({"error": "Task not found or you don't have permission to delete it"}), 404
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ROUTE_4: [PUT] - Update a task with selected TaskID (LOGIN required)
task_update_bp = Blueprint('task_update_bp', __name__)

@task_update_bp.route("/api/tasks/task_update/<id>", methods=["PUT"])
@jwt_required()
def task_update(id):
    try:
        from config.database_connection import MongoDB
        mongodb = MongoDB()
        db = mongodb.get_db("Opt_Time_Management")

        token = get_jwt_identity()
        
        task_id = ObjectId(id)
        task_data = request.json

        existing_task = db.Tasks.find_one({"_id": task_id, "User_ID": token})
        if not existing_task:
            return jsonify({"error": "Task not found or you don't have permission to update it"}), 404

        # Update task fields
        db.Tasks.update_one(
            {"_id": task_id},
            {
                "$set": {
                    "Title": task_data.get("Title", existing_task["Title"]),
                    "Due_date": task_data.get("Due_date", existing_task["Due_date"]),
                    "Importance": task_data.get("Importance", existing_task["Importance"]),
                    "Urgency": task_data.get("Urgency", existing_task["Urgency"]),
                    "Description": task_data.get("Description", existing_task["Description"]),
                    "Notification_period": task_data.get("Notification_period", existing_task["Notification_period"]),
                }
            }
        )

        return jsonify({"message": "Task updated successfully"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500



def predict_urgency_importance(model, task_title, due_date):
    # Function to predict urgency and importance using the model
    # Implement this function based on your trained model
    # You would typically preprocess the input data, make predictions, and return the results
    # Example implementation:
    # urgency = model.predict(task_title, due_date)
    # importance = model.predict_importance(task_title, due_date)
    # return urgency, importance
    pass