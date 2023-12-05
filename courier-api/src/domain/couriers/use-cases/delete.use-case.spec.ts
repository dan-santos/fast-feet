import { makeCourier } from 'test/factories/makeCourier';
import { DeleteUseCase } from './delete.use-case';
import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers.repository';

let sut: DeleteUseCase;
let repository: InMemoryCouriersRepository;

describe('Delete use case', () => {

  beforeEach(async () => {
    repository = new InMemoryCouriersRepository();
    sut = new DeleteUseCase(repository);
  });

  it('should be able to delete a courier', async () => {
    repository.create(makeCourier({ email: 'joao@mail.com' }));
    await sut.execute('joao@mail.com');

    expect(repository.items).toHaveLength(0);
  });

  it('should NOT be able to delete a unexistent courier', async () => {
    await expect(() => 
      sut.execute('unexistent-courier@email.com')
    ).rejects.toThrow(Error);
  });

  it('should NOT be able to delete a courier with wrong email address format', async () => {
    await expect(() => 
      sut.execute('unexistent-courier-malformed-email')
    ).rejects.toThrow(Error);
  });
});
