from datetime import datetime
from flask_jwt_extended import get_jwt_identity

class Tasks:
    def __init__(self, title, due_date, urgency, importance,description):
        self.title = title
        self.due_date = due_date
        self.urgency = urgency
        self.importance = importance
        self.description = description

    def add_task(self, db, user_id):

        task_collection = db["Tasks"]

        task_collection.insert_one({
            "User_ID": user_id,
            "Created_At": datetime.now(),
            "Title": self.title,
            "Due_date": self.due_date,
            "Urgency": self.urgency ,
            "Importance": self.importance,
            "Description" : self.description
        })