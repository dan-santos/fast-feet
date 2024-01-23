from typing import Dict, Union
from user_api.domain.models.user import User
from user_api.domain.repositories.user_repository import IUserRepository

class InMemoryUserRepository(IUserRepository):
    users: Dict[str, User] = {}

    async def insert(self, user: User) -> None:
        self.users[user.email] = user

    async def find_by_email(self, user_email: str) -> Union[User, None]:
        return self.users.get(user_email, None)