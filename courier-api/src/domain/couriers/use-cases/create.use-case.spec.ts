import { ConflictError, InvalidEmailError } from '@errors/custom-errors';
import { CreateUseCase } from './create.use-case';
import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers.repository';

let sut: CreateUseCase;
let repository: InMemoryCouriersRepository;

describe('Create use case', () => {

  beforeEach(async () => {
    repository = new InMemoryCouriersRepository();
    sut = new CreateUseCase(repository);
  });

  it('should be able to add a new courier', async () => {
    await sut.execute({ email: 'joao@mail.com', name: 'joao' });

    expect(repository.items).toHaveLength(1);
  });

  it('should NOT be able to add a new courier with already existent email address', async () => {
    await sut.execute({ email: 'joao@mail.com', name: 'joao' });

    await expect(() => 
      sut.execute({ email: 'joao@mail.com', name: 'joao' })
    ).rejects.toBeInstanceOf(ConflictError);
  });

  it('should NOT be able to add a new courier with wrong email address format', () => {
    expect(sut.execute({ email: 'joao', name: 'joao' })).rejects.toThrow(InvalidEmailError);
  });
});
