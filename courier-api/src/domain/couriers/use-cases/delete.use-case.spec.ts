import { makeCourier } from 'test/factories/makeCourier';
import { DeleteUseCase } from './delete.use-case';
import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers.repository';
import { InvalidIdError } from '@errors/custom-errors';
import { randomUUID } from 'node:crypto';

let sut: DeleteUseCase;
let repository: InMemoryCouriersRepository;

describe('Delete use case', () => {

  beforeEach(async () => {
    repository = new InMemoryCouriersRepository();
    sut = new DeleteUseCase(repository);
  });

  it('should be able to delete a courier', async () => {
    const fakeCourier = makeCourier();
    repository.create(fakeCourier);
    await sut.execute(fakeCourier.id.toString());

    expect(repository.items).toHaveLength(0);
  });

  it('should NOT be able to delete a unexistent courier', async () => {
    repository.create(makeCourier());
    await sut.execute(randomUUID());

    expect(repository.items).toHaveLength(1);
  });

  it('should NOT be able to delete a courier without UUID id param', async () => {
    await expect(() => 
      sut.execute('malformed-courier-id')
    ).rejects.toThrow(InvalidIdError);
  });
});
