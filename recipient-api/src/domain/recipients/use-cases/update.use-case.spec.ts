import { makeRecipient } from 'test/factories/makeRecipient';
import { UpdateUseCase } from './update.use-case';
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients.repository';
import { 
  ConflictError, InsuficientArgumentsError, InvalidEmailError, InvalidIdError 
} from '@errors/custom-errors';
import { randomUUID } from 'crypto';

let sut: UpdateUseCase;
let repository: InMemoryRecipientsRepository;

describe('Update use case', () => {

  beforeEach(async () => {
    repository = new InMemoryRecipientsRepository();
    sut = new UpdateUseCase(repository);
  });

  it('should be able to update a recipient', async () => {
    const fakeRecipient = makeRecipient({ email: 'joao@mail.com', name: 'joao' });
    await repository.create(fakeRecipient);

    await sut.execute({ name: 'joao das neves' }, fakeRecipient.id.toString());

    expect(repository.items[0]).toEqual(expect.objectContaining(
      { 
        props: expect.objectContaining({ 
          name: 'joao das neves',
          email: 'joao@mail.com'
        }) 
      }
    ));
  });

  it('should NOT be able to update a recipient email with wrong email format', async () => {
    await expect(() => 
      sut.execute({ email: 'malformed-recipient-email' }, randomUUID())
    ).rejects.toThrow(InvalidEmailError);
  });

  it('should NOT be able to update a recipient with wrong id format', async () => {
    await expect(() => 
      sut.execute({ email: 'joao@mail.com' }, 'malformed-recipient-id')
    ).rejects.toThrow(InvalidIdError);
  });

  it('should NOT be able to update a recipient email to an already existent email', async () => {
    await repository.create(makeRecipient({ email: 'joao.neves@mail.com' }));
    const fakeRecipient = makeRecipient({ email: 'joao@mail.com' });
    await repository.create(fakeRecipient);

    await expect(() => 
      sut.execute({ email: 'joao.neves@mail.com' }, fakeRecipient.id.toString())
    ).rejects.toThrow(ConflictError);
  });

  it('should NOT be able to update a recipient without any arguments to update', async () => {
    await expect(() => 
      sut.execute({}, randomUUID())
    ).rejects.toThrow(InsuficientArgumentsError);
  });
});
