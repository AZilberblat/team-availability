import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.db.init_db import init_db
from src.routes.endpoints import router

import uvicorn


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ["FRONT_URL"]],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)


@app.on_event("startup")
async def on_startup():
    await init_db()


if __name__ == '__main__':
    uvicorn.run(app=app, host="0.0.0.0", port=8000)
