import { makeOrder } from 'test/factories/make-order';
import { FindManyUseCase } from './find-many.use-case';
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders.repository';

let sut: FindManyUseCase;
let repository: InMemoryOrdersRepository;

describe('FindMany use case', () => {

  beforeEach(async () => {
    repository = new InMemoryOrdersRepository();
    sut = new FindManyUseCase(repository);
  });

  it('should be able to find all orders', async () => {
    repository.create(makeOrder());
    repository.create(makeOrder());
    repository.create(makeOrder());
    const { orders } = await sut.execute();

    expect(orders).toHaveLength(3);
  });

  it('should be able to find all orders with pagination', async () => {
    for (let i = 0; i < 11; i++) {
      repository.create(makeOrder());  
    }
    const { orders } = await sut.execute({ skip: 10 });

    expect(orders).toHaveLength(1);
  });
});
