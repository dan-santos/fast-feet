import { makeRecipient } from 'test/factories/makeRecipient';
import { FindByIdUseCase } from './find-by-id.use-case';
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients.repository';
import { InvalidIdError } from '@errors/custom-errors';
import { randomUUID } from 'node:crypto';

let sut: FindByIdUseCase;
let repository: InMemoryRecipientsRepository;

describe('FindByEmail use case', () => {

  beforeEach(async () => {
    repository = new InMemoryRecipientsRepository();
    sut = new FindByIdUseCase(repository);
  });

  it('should be able to find by id a recipient', async () => {
    const fakeRecipient = makeRecipient({ email: 'joao@mail.com' });
    await repository.create(fakeRecipient);
    const { recipient } = await sut.execute(fakeRecipient.id.toString());

    expect(recipient.email).toEqual('joao@mail.com');
  });

  it('should NOT be able to find by id a unexistent recipient', async () => {
    const { recipient } = await sut.execute(randomUUID());

    expect(recipient).toEqual(null);
  });

  it('should NOT be able to find by id a recipient with wrong id format', async () => {
    await expect(() => 
      sut.execute('unexistent-recipient-malformed-id')
    ).rejects.toThrow(InvalidIdError);
  });
});
