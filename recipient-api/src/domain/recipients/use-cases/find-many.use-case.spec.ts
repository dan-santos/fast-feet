import { makeRecipient } from 'test/factories/makeRecipient';
import { FindManyUseCase } from './find-many.use-case';
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients.repository';

let sut: FindManyUseCase;
let repository: InMemoryRecipientsRepository;

describe('FindMany use case', () => {

  beforeEach(async () => {
    repository = new InMemoryRecipientsRepository();
    sut = new FindManyUseCase(repository);
  });

  it('should be able to find all recipients', async () => {
    await repository.create(makeRecipient());
    await repository.create(makeRecipient());
    await repository.create(makeRecipient());
    const { recipients } = await sut.execute();

    expect(recipients).toHaveLength(3);
  });

  it('should be able to find all recipients with pagination', async () => {
    for (let i = 0; i < 11; i++) {
      repository.create(makeRecipient());  
    }
    const { recipients } = await sut.execute({ skip: 10 });

    expect(recipients).toHaveLength(1);
  });
});
