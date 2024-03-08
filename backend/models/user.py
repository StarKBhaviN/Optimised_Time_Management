# User modal which contains basic Schema of User collection
from datetime import datetime

class User:
    # All fields required in User collection
    def __init__(self, name, email, gender, password, phNo, hobby):
        self.name = name
        self.email = email
        self.gender = gender
        self.password = password
        self.phNo = phNo
        self.hobby = hobby

    # Create a user and add in collection
    def create_user(self, db):
        user_collection = db["Users"]
        user_id = self._get_next_sequence(db)

        user_data = ({
            "Created_At": datetime.now(),
            "_id": user_id,
            "Name": self.name,
            "Email": self.email,
            "Password": self.password,
            "Gender": self.gender,
            "PhNo": self.phNo,
            "Hobbies": self.hobby
        })

        user_collection.insert_one(user_data)
        print(user_id)
        return user_id

    # Methods that can be applied on User collection
    @staticmethod
    def getUserByEmail(db, email):
        user_collection = db["Users"]
        return user_collection.find_one({"Email": email})

    def update(self, db, **kwargs):
        user_collection = db["Users"]
        return user_collection.update_one({"_id": self._id}, {"$set": kwargs})

    def delete(self, db):
        user_collection = db["Users"]
        user_collection.delete_one({"_id": self._id})

    # Used for increamating userID on every new user creation
    @staticmethod
    def _get_next_sequence(db):
        counters_collection = db["counters"]
        sequence_document = counters_collection.find_one_and_update(
            {"_id": "user_id"},
            {"$inc": {"sequence_value": 1}},
            return_document=True,
            upsert=True
        )
        return sequence_document["sequence_value"]

