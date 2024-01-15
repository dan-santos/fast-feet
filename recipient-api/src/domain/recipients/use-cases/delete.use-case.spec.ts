import { makeRecipient } from 'test/factories/makeRecipient';
import { DeleteUseCase } from './delete.use-case';
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients.repository';
import { InvalidIdError } from '@errors/custom-errors';
import { randomUUID } from 'node:crypto';

let sut: DeleteUseCase;
let repository: InMemoryRecipientsRepository;

describe('Delete use case', () => {

  beforeEach(async () => {
    repository = new InMemoryRecipientsRepository();
    sut = new DeleteUseCase(repository);
  });

  it('should be able to delete a recipient', async () => {
    const fakeRecipient = makeRecipient();
    repository.create(fakeRecipient);
    await sut.execute(fakeRecipient.id.toString());

    expect(repository.items).toHaveLength(0);
  });

  it('should NOT be able to delete a unexistent recipient', async () => {
    repository.create(makeRecipient());
    await sut.execute(randomUUID());

    expect(repository.items).toHaveLength(1);
  });

  it('should NOT be able to delete a recipient without UUID id param', async () => {
    await expect(() => 
      sut.execute('malformed-recipient-id')
    ).rejects.toThrow(InvalidIdError);
  });
});
