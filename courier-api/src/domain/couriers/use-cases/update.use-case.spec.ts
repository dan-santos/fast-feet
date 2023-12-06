import { makeCourier } from 'test/factories/makeCourier';
import { UpdateUseCase } from './update.use-case';
import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers.repository';

let sut: UpdateUseCase;
let repository: InMemoryCouriersRepository;

describe('Update use case', () => {

  beforeEach(async () => {
    repository = new InMemoryCouriersRepository();
    sut = new UpdateUseCase(repository);
  });

  it('should be able to update a courier', async () => {
    repository.create(makeCourier({ email: 'joao@mail.com', name: 'joao' }));

    await sut.execute({ email: 'joao@mail.com', name: 'joao das neves' });

    expect(repository.items[0]).toEqual(expect.objectContaining(
      { 
        props: expect.objectContaining({ 
          name: 'joao das neves'
        }) 
      }
    ));
  });

  it('should NOT be able to update a unexistent courier', async () => {
    await expect(() => 
      sut.execute({ email: 'joao@mail.com' })
    ).rejects.toThrow(Error);
  });

  it('should NOT be able to update a courier without email', async () => {
    await expect(() => 
      sut.execute({})
    ).rejects.toThrow(Error);
  });

  it('should NOT be able to update a courier without any arguments to update', async () => {
    await expect(() => 
      sut.execute({ email: 'joao@mail.com' })
    ).rejects.toThrow(Error);
  });
});
