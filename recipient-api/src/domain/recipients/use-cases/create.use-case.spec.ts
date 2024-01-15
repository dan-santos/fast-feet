import { ConflictError, InvalidEmailError } from '@errors/custom-errors';
import { CreateUseCase } from './create.use-case';
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients.repository';
import { makeRecipient } from 'test/factories/makeRecipient';

let sut: CreateUseCase;
let repository: InMemoryRecipientsRepository;

describe('Create use case', () => {

  beforeEach(async () => {
    repository = new InMemoryRecipientsRepository();
    sut = new CreateUseCase(repository);
  });

  it('should be able to add a new recipient', async () => {
    const fakeRecipient = makeRecipient();
    await sut.execute({ 
      email: fakeRecipient.email, 
      name: fakeRecipient.name,
      street: fakeRecipient.street,
      number: fakeRecipient.number,
      zipCode: fakeRecipient.zipCode
    });

    expect(repository.items).toHaveLength(1);
  });

  it('should NOT be able to add a new recipient with already existent email address', async () => {
    const fakeRecipient = makeRecipient();
    await sut.execute({ 
      email: fakeRecipient.email, 
      name: fakeRecipient.name,
      street: fakeRecipient.street,
      number: fakeRecipient.number,
      zipCode: fakeRecipient.zipCode
    });

    await expect(() => 
      sut.execute({ 
        email: fakeRecipient.email, 
        name: fakeRecipient.name,
        street: fakeRecipient.street,
        number: fakeRecipient.number,
        zipCode: fakeRecipient.zipCode
      })
    ).rejects.toBeInstanceOf(ConflictError);
  });

  it('should NOT be able to add a new recipient with wrong email address format', async () => {
    const fakeRecipient = makeRecipient();

    await expect(() => 
      sut.execute({ 
        email: fakeRecipient.name, 
        name: fakeRecipient.name,
        street: fakeRecipient.street,
        number: fakeRecipient.number,
        zipCode: fakeRecipient.zipCode
      })
    ).rejects.toBeInstanceOf(InvalidEmailError);
  });
});
