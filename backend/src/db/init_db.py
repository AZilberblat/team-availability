import asyncio

from ..core.security import SecurityService
from .client import MongoDB
from ..models.status import Status


async def init_db():
    db = MongoDB().get_collection("users")
    sec = SecurityService()
    initial_users = [
        {"username": "manager", "password": "administrator", "status": Status.WORKING},
        {"username": "bob", "password": "bob123", "status": Status.ON_VACATION},
        {"username": "alice", "password": "alice123", "status": Status.WORKING_REMOTELY},
        {"username": "dave", "password": "dave123", "status": Status.BUSINESS_TRIP},
    ]

    for user in initial_users:
        existing = await db.find_one({"username": user["username"]})
        if not existing:
            hashed = sec.get_password_hash(user["password"])
            await db.insert_one({
                "username": user["username"],
                "hashed_password": hashed,
                "status": user["status"].value
            })
        else:
            await db.update_one(
                {"username": user["username"]},
                {"$set": {"status": user["status"].value}}
            )


asyncio.run(init_db())
