import { InvalidIdError } from '@errors/custom-errors';
import { CreateUseCase } from './create.use-case';
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders.repository';
import { randomUUID } from 'node:crypto';
import { OrderStates } from '@validator/order-states.enum';

let sut: CreateUseCase;
let repository: InMemoryOrdersRepository;

describe('Create use case', () => {

  beforeEach(async () => {
    repository = new InMemoryOrdersRepository();
    sut = new CreateUseCase(repository);
  });

  it('should be able to add a new order', async () => {
    const fakeRecipientId = randomUUID();
    await sut.execute({ recipientId: fakeRecipientId });

    expect(repository.items).toHaveLength(1);
    expect(repository.items[0].status).toEqual(OrderStates.WAITING);
    expect(repository.items[0].courierId).toEqual(null);
  });

  it('should NOT be able to add a new order with invalid recipientId UUID', async () => {
    await expect(() => 
      sut.execute({ recipientId: 'invalid-uuid' })
    ).rejects.toBeInstanceOf(InvalidIdError);
  });
});
