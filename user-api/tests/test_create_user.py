from pydantic_core import ValidationError
import pytest
import asyncio

from user_api.domain.dtos.user import CreateUserRequest
from user_api.domain.models.user import Roles
from user_api.domain.use_cases.create_user import CreateUserUseCase
from .repositories.in_memory_user_repository import InMemoryUserRepository

@pytest.fixture(autouse=True, scope='function')
def setup_before_each_test():
    # setup
    global repository
    global sut

    repository = InMemoryUserRepository()
    sut = CreateUserUseCase(repository)

    yield # tests

    # teardown
    repository.users.clear()
    

@pytest.mark.asyncio
async def test_should_be_able_to_create_an_user():
    
    args = CreateUserRequest(
        email='dan@mail.com',
        full_name='Dan Santos',
        hashed_password='fakepassword',
        role=Roles.RECIPIENT,
    )
    
    await sut.execute(args)

    assert len(repository.users) == 1


@pytest.mark.asyncio
async def test_should_NOT_be_able_to_create_an_user_with_wrong_email_format():

    with pytest.raises(ValidationError):
        await sut.execute(
            CreateUserRequest(
                email='invalid email',
                full_name='Dan Santos',
                hashed_password='fakepassword',
                role=Roles.RECIPIENT,
            )
        )

@pytest.mark.asyncio
async def test_should_NOT_be_able_to_create_an_user_with_same_email():

    args = CreateUserRequest(
        email='dan@mail.com',
        full_name='Dan Santos',
        hashed_password='fakepassword',
        role=Roles.RECIPIENT,
    )

    await sut.execute(args)

    with pytest.raises(ValueError):
        await sut.execute(args)