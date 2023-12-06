import { makeCourier } from 'test/factories/makeCourier';
import { FindByEmailUseCase } from './find-by-email.use-case';
import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers.repository';
import { InvalidEmailError } from 'src/core/errors/custom-errors';

let sut: FindByEmailUseCase;
let repository: InMemoryCouriersRepository;

describe('FindByEmail use case', () => {

  beforeEach(async () => {
    repository = new InMemoryCouriersRepository();
    sut = new FindByEmailUseCase(repository);
  });

  it('should be able to find by email a courier', async () => {
    repository.create(makeCourier({ email: 'joao@mail.com', name: 'joao' }));
    const { courier } = await sut.execute('joao@mail.com');

    expect(courier.email).toEqual('joao@mail.com');
  });

  it('should NOT be able to findbyemail a unexistent courier', async () => {
    const { courier } = await sut.execute('joao@mail.com');

    expect(courier).toEqual(null);
  });

  it('should NOT be able to find by email a courier with wrong email address format', async () => {
    await expect(() => 
      sut.execute('unexistent-courier-malformed-email')
    ).rejects.toThrow(InvalidEmailError);
  });
});
