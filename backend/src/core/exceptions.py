from fastapi import HTTPException
from starlette import status

not_found_exception = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="User Not Found!"
)

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could Not Validate Credentials"
)