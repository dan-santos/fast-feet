from fastapi import FastAPI
from user_api.infra.routers.user_router import user_router

app = FastAPI()

app.include_router(user_router, prefix='/api')