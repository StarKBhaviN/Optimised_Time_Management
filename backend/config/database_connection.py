# Connects the backend with MongoDB
import pymongo

class MongoDB:
    _client = None

    @classmethod
    def init_app(cls, app):
        mongo_uri = app.config.get("MONGO_URI")
        if mongo_uri is None:
            raise ValueError("MONGO_URI is not set in the app configuration")
        cls._client = pymongo.MongoClient(mongo_uri)

    @classmethod
    def get_client(cls):
        if cls._client is None:
            raise RuntimeError("MongoDB client is not initialized. Call init_app() first.")
        return cls._client

    @classmethod
    def get_db(cls, db_name):
        client = cls.get_client()
        return client[db_name]
