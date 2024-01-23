from abc import ABC, abstractmethod
from typing import Union

from user_api.domain.models.user import User

class IUserRepository(ABC):
    @abstractmethod
    async def insert(user: User) -> None: pass
    @abstractmethod
    async def find_by_email(user_email: str) -> Union[User, None]: pass