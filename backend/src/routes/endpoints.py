from typing import List

from fastapi import APIRouter, Depends

from ..core.exceptions import credentials_exception, not_found_exception
from ..core.security import SecurityService
from fastapi.security import OAuth2PasswordRequestForm

from ..db.client import MongoDB
from ..models.Token import Token
from ..models.status import Status
from ..models.user import User

router = APIRouter()
sec = SecurityService()
db = MongoDB().get_collection("users")


@router.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await sec.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise credentials_exception
    token = sec.create_access_token(sub=user.username)
    return {'access_token': token, "token_type": "bearer"}


@router.get("/users", response_model=List[User])
async def get_users(current_user: User = Depends(sec.get_current_user)):
    docs = await db.find().to_list()
    print(docs)
    return [User(username=user_data["username"], status=Status(user_data["status"])) for user_data in docs]


@router.get("/users/{username}/status", response_model=User)
async def update_user_status(username: str, payload: Status, current_user: User = Depends(sec.get_current_user)):
    results = await db.update_one(
        {"username": username},
        {"$set": {"status": payload.value}}
    )

    if results.matched_count == 0:
        raise not_found_exception
    return User(username=username, status=payload)
