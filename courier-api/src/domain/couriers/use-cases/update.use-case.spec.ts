import { makeCourier } from 'test/factories/makeCourier';
import { UpdateUseCase } from './update.use-case';
import { InMemoryCouriersRepository } from 'test/repositories/in-memory-couriers.repository';
import { 
  ConflictError, InsuficientArgumentsError, InvalidEmailError, InvalidIdError 
} from '@errors/custom-errors';
import { randomUUID } from 'crypto';

let sut: UpdateUseCase;
let repository: InMemoryCouriersRepository;

describe('Update use case', () => {

  beforeEach(async () => {
    repository = new InMemoryCouriersRepository();
    sut = new UpdateUseCase(repository);
  });

  it('should be able to update a courier', async () => {
    const fakeCourier = makeCourier({ email: 'joao@mail.com', name: 'joao' });
    repository.create(fakeCourier);

    await sut.execute({ name: 'joao das neves' }, fakeCourier.id.toString());

    expect(repository.items[0]).toEqual(expect.objectContaining(
      { 
        props: expect.objectContaining({ 
          name: 'joao das neves',
          email: 'joao@mail.com'
        }) 
      }
    ));
  });

  it('should NOT be able to update a courier email with wrong email format', async () => {
    await expect(() => 
      sut.execute({ email: 'malformed-courier-mail' }, randomUUID())
    ).rejects.toThrow(InvalidEmailError);
  });

  it('should NOT be able to update a courier with wrong id format', async () => {
    await expect(() => 
      sut.execute({ email: 'joao@mail.com' }, 'malformed-courier-id')
    ).rejects.toThrow(InvalidIdError);
  });

  it('should NOT be able to update a courier email to an already existent email', async () => {
    repository.create(makeCourier({ email: 'joao.neves@mail.com' }));
    const fakeCourier = makeCourier({ email: 'joao@mail.com' });
    repository.create(fakeCourier);

    await expect(() => 
      sut.execute({ email: 'joao.neves@mail.com' }, fakeCourier.id.toString())
    ).rejects.toThrow(ConflictError);
  });

  it('should NOT be able to update a courier without any arguments to update', async () => {
    await expect(() => 
      sut.execute({}, randomUUID())
    ).rejects.toThrow(InsuficientArgumentsError);
  });
});
