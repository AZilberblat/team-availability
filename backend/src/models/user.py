from pydantic import BaseModel, Field

from .status import Status


class User(BaseModel):
    username: str
    status: Status = Field(..., description="Current Status Of The User")