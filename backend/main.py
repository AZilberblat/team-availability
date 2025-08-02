import asyncio

from fastapi import FastAPI

from src.db.init_db import init_db
from src.routes.endpoints import router
import uvicorn

app = FastAPI()
app.include_router(router)


@app.on_event("startup")
async def on_startup():
    await init_db()


if __name__ == '__main__':
    uvicorn.run(app=app, host="0.0.0.0", port=8000)
