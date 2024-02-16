from datetime import datetime
from flask_jwt_extended import get_jwt_identity

class Tasks:
    def __init__(self, title, due_date, urgency, importance):
        self.title = title
        self.due_date = due_date
        self.urgency = urgency
        self.importance = importance

    def add_task(self, db, token):

        task_collection = db["Tasks"]

        task_collection.insert_one({
            "User_ID": token["_id"],
            "Created_At": datetime.now(),
            "Title": self.title,
            "Due_date": self.due_date,
            "Urgency": self.urgency,
            "Importance": self.importance
        })