import { randomUUID } from 'crypto';
import { DeliverOrderEvent } from './deliver-order.event';
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders.repository';
import { OrderStates } from '@validator/order-states.enum';
import { InvalidIdError } from '@errors/custom-errors';

let sut: DeliverOrderEvent;
let repository: InMemoryOrdersRepository;

describe('Deliver order event', () => {

  beforeEach(async () => {
    repository = new InMemoryOrdersRepository();
    sut = new DeliverOrderEvent(repository);
  });

  it('should be able to send message to repository with a delivered order', async () => {
    const fakeCourierId = randomUUID();
    const fakeOrderId = randomUUID();

    await sut.execute({ courierId: fakeCourierId, orderId: fakeOrderId });

    const topicNames = repository.topics.map(t => t.name);
    expect(repository.topics).toHaveLength(1);
    expect(topicNames).toContain('ORDERS');
    expect(repository.topics[0].messages).toEqual(expect.arrayContaining([
      expect.objectContaining({
        courierId: fakeCourierId, orderId: fakeOrderId, status: OrderStates.DELIVERED
      }),
    ]));
  });

  it('should NOT be able to send message with wrong UUID courierId', async () => {
    await expect(() => 
      sut.execute({ courierId: 'invalid-id', orderId: randomUUID() })
    ).rejects.toBeInstanceOf(InvalidIdError);
  });

  it('should NOT be able to send message with wrong UUID orderId', async () => {
    await expect(() => 
      sut.execute({ courierId: randomUUID(), orderId: 'invalid-id' })
    ).rejects.toBeInstanceOf(InvalidIdError);
  });
});
