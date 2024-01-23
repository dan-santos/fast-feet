from fastapi import APIRouter

from user_api.domain.dtos.user import CreateUserRequest

user_router = APIRouter(
    prefix='/v1/auth',
    tags=['authentication']
)

@user_router.post('/signup')
async def signup(user: CreateUserRequest):
    return user

@user_router.post('/login')
async def login():
    return {
        'Logged': True
    }