import os
from datetime import datetime, timedelta
from typing import Optional, Annotated
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import JWTError, jwt

from .exceptions import not_found_exception, credentials_exception
from ..db.client import MongoDB
from ..models.user import User
from ..models.user_in_db import UserInDB

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")


class SecurityService:

    def __init__(self):
        self.__pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        self.db = MongoDB()

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return self.__pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(self, password: str) -> str:
        return self.__pwd_context.hash(password)

    @staticmethod
    def create_access_token(sub: str, expire_delta: Optional[timedelta] = None) -> str:
        to_encode = {"sub": sub}
        expire = datetime.utcnow() + (
                expire_delta or timedelta(minutes=float(os.environ["ACCESS_TOKEN_EXPIRE_MINUTES"])))
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, os.environ["SECRET_KEY"], algorithm=os.environ["ALGORITHM"])

    async def get_user(self, username: str) -> UserInDB:
        col = self.db.get_collection("users")
        data = await col.find_one({"username": username})
        if not data:
            raise not_found_exception
        return UserInDB(**data)

    async def authenticate_user(self, username: str, password: str) -> UserInDB:
        user = await self.get_user(username)
        if not user or not self.verify_password(password, user.hashed_password):
            raise credentials_exception
        return user

    @staticmethod
    async def verify_token(token: str) -> str:
        try:
            payload = jwt.decode(token, os.environ["SECRET_KEY"], os.environ["ALGORITHM"])
            print("testing payload")
            print(payload)
            username: str = payload.get("sub")
            if username is None:
                raise credentials_exception
            return username
        except JWTError:
            raise credentials_exception

    async def get_current_user(self, token: Annotated[str, Depends(oauth2_scheme)]):
        username = await self.verify_token(token=token)
        user = await self.get_user(username)
        if user is None:
            raise credentials_exception
        return User(username=user.username, status=user.status)
