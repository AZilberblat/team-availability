from pydantic import BaseModel
from .status import Status


class StatusUpdateRequest(BaseModel):
    status: Status
