import { makeOrder } from 'test/factories/make-order';
import { DeleteUseCase } from './delete.use-case';
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders.repository';
import { InvalidIdError } from '@errors/custom-errors';
import { randomUUID } from 'node:crypto';

let sut: DeleteUseCase;
let repository: InMemoryOrdersRepository;

describe('Delete use case', () => {

  beforeEach(async () => {
    repository = new InMemoryOrdersRepository();
    sut = new DeleteUseCase(repository);
  });

  it('should be able to delete a order', async () => {
    const fakeOrder = makeOrder();
    repository.create(fakeOrder);
    await sut.execute(fakeOrder.id.toString());

    expect(repository.items).toHaveLength(0);
  });

  it('should NOT be able to delete a unexistent order', async () => {
    repository.create(makeOrder());
    await sut.execute(randomUUID());

    expect(repository.items).toHaveLength(1);
  });

  it('should NOT be able to delete a order without UUID id param', async () => {
    await expect(() => 
      sut.execute('malformed-order-id')
    ).rejects.toThrow(InvalidIdError);
  });
});
