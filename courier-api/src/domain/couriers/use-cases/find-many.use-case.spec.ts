import { makeCourier } from 'test/factories/makeCourier';
import { FindManyUseCase } from './find-many.use-case';
import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers.repository';

let sut: FindManyUseCase;
let repository: InMemoryCouriersRepository;

describe('FindMany use case', () => {

  beforeEach(async () => {
    repository = new InMemoryCouriersRepository();
    sut = new FindManyUseCase(repository);
  });

  it('should be able to find all couriers', async () => {
    repository.create(makeCourier());
    repository.create(makeCourier());
    repository.create(makeCourier());
    const { couriers } = await sut.execute();

    expect(couriers).toHaveLength(3);
  });

  it('should be able to find all couriers with pagination', async () => {
    for (let i = 0; i < 11; i++) {
      repository.create(makeCourier());  
    }
    const { couriers } = await sut.execute({ skip: 10 });

    expect(couriers).toHaveLength(1);
  });
});
