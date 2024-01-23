import { makeOrder } from 'test/factories/make-order';
import { FindByIdUseCase } from './find-by-id.use-case';
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders.repository';
import { InvalidIdError } from '@errors/custom-errors';
import { randomUUID } from 'node:crypto';

let sut: FindByIdUseCase;
let repository: InMemoryOrdersRepository;

describe('FindByEmail use case', () => {

  beforeEach(async () => {
    repository = new InMemoryOrdersRepository();
    sut = new FindByIdUseCase(repository);
  });

  it('should be able to find by id a order', async () => {
    const fakeOrder = makeOrder();
    repository.create(fakeOrder);

    const { order } = await sut.execute(fakeOrder.id.toString());

    expect(order.id).toEqual(fakeOrder.id);
  });

  it('should NOT be able to find by id a unexistent order', async () => {
    const { order } = await sut.execute(randomUUID());

    expect(order).toEqual(null);
  });

  it('should NOT be able to find by id a order with wrong id format', async () => {
    await expect(() => 
      sut.execute('unexistent-order-malformed-id')
    ).rejects.toThrow(InvalidIdError);
  });
});
