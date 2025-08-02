import os

from motor import motor_asyncio

class MongoDB:

    def __init__(self):
        self.__client = motor_asyncio.AsyncIOMotorClient(os.environ["MONGO_URL"])
        self.__db = self.__client[os.environ["MONGO_DB"]]

    def get_database(self):
        return self.__db

    def get_collection(self, collection_name: str):
        return self.__db[collection_name]
