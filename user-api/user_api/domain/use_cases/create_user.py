from user_api.domain.dtos.user import CreateUserRequest
from user_api.domain.models.user import User
from user_api.domain.repositories.user_repository import IUserRepository

class CreateUserUseCase():
    repository: IUserRepository

    def __init__(self, repository: IUserRepository) -> None:
        self.repository = repository

    async def execute(self, user: CreateUserRequest):
        tmp_user = User(**dict(user))

        user_already_exists = await self.repository.find_by_email(tmp_user.email)
        if user_already_exists:
            raise ValueError('User already exists')
        
        await self.repository.insert(tmp_user)