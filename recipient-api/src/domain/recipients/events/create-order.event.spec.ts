import { randomUUID } from 'crypto';
import { CreateOrderEvent } from './create-order.event';
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders.repository';
import { OrderStates } from '@validator/order-states.enum';
import { InvalidIdError } from '@errors/custom-errors';

let sut: CreateOrderEvent;
let repository: InMemoryOrdersRepository;

describe('Collect order event', () => {

  beforeEach(async () => {
    repository = new InMemoryOrdersRepository();
    sut = new CreateOrderEvent(repository);
  });

  it('should be able to send message to repository with a collected order', async () => {
    const fakeRecipientId = randomUUID();
    const fakeOrderId = randomUUID();

    await sut.execute({ recipientId: fakeRecipientId, orderId: fakeOrderId });

    const topicNames = repository.topics.map(t => t.name);
    expect(repository.topics).toHaveLength(1);
    expect(topicNames).toContain('ORDERS');
    expect(repository.topics[0].messages).toEqual(expect.arrayContaining([
      expect.objectContaining({
        recipientId: fakeRecipientId, orderId: fakeOrderId, status: OrderStates.WAITING
      }),
    ]));
  });

  it('should NOT be able to send message with wrong UUID recipientId', async () => {
    await expect(() => 
      sut.execute({ recipientId: 'invalid-id', orderId: randomUUID() })
    ).rejects.toBeInstanceOf(InvalidIdError);
  });

  it('should NOT be able to send message with wrong UUID orderId', async () => {
    await expect(() => 
      sut.execute({ recipientId: randomUUID(), orderId: 'invalid-id' })
    ).rejects.toBeInstanceOf(InvalidIdError);
  });
});
