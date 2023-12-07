import { makeCourier } from 'test/factories/makeCourier';
import { FindByIdUseCase } from './find-by-id.use-case';
import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers.repository';
import { InvalidIdError } from '@errors/custom-errors';
import { randomUUID } from 'node:crypto';

let sut: FindByIdUseCase;
let repository: InMemoryCouriersRepository;

describe('FindByEmail use case', () => {

  beforeEach(async () => {
    repository = new InMemoryCouriersRepository();
    sut = new FindByIdUseCase(repository);
  });

  it('should be able to find by id a courier', async () => {
    const fakeCourier = makeCourier({ email: 'joao@mail.com' });
    repository.create(fakeCourier);
    const { courier } = await sut.execute(fakeCourier.id.toString());

    expect(courier.email).toEqual('joao@mail.com');
  });

  it('should NOT be able to find by id a unexistent courier', async () => {
    const { courier } = await sut.execute(randomUUID());

    expect(courier).toEqual(null);
  });

  it('should NOT be able to find by id a courier with wrong id format', async () => {
    await expect(() => 
      sut.execute('unexistent-courier-malformed-id')
    ).rejects.toThrow(InvalidIdError);
  });
});
