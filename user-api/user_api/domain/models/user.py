from enum import Enum
from dataclasses import dataclass

class Roles(Enum):
    COURIER = 'COURIER'
    RECIPIENT = 'RECIPIENT'
    ADMIN = 'ADMIN'

@dataclass
class User:
    email: str
    full_name: str
    hashed_password: str
    role: Roles
    is_active: bool = False