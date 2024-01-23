from pydantic import BaseModel, EmailStr, Field
from user_api.domain.models.user import Roles

class CreateUserRequest(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role: Roles
    is_active: bool = False