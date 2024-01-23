import { UpdateUseCase } from './update.use-case';
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders.repository';
import { OrderStates } from '@validator/order-states.enum';
import { makeOrder } from 'test/factories/make-order';
import { InsuficientArgumentsError, InvalidIdError } from '@errors/custom-errors';

let sut: UpdateUseCase;
let repository: InMemoryOrdersRepository;

describe('Update use case', () => {

  beforeEach(async () => {
    repository = new InMemoryOrdersRepository();
    sut = new UpdateUseCase(repository);
  });

  it('should be able to update an order', async () => {
    const fakeOrder = makeOrder({ status: OrderStates.WAITING });

    repository.create(fakeOrder);

    await sut.execute({ 
      recipientId: fakeOrder.recipientId.toString(),
      courierId: fakeOrder.courierId.toString(),
      status: OrderStates.INCOMING
    }, fakeOrder.id.toString());

    expect(repository.items[0].status).toEqual(OrderStates.INCOMING);
  });

  it('should NOT be able to update an order with invalid orderId', async () => {
    const fakeOrder = makeOrder({ status: OrderStates.WAITING });

    repository.create(fakeOrder);

    await expect(() =>
      sut.execute({ 
        recipientId: fakeOrder.recipientId.toString(),
        courierId: fakeOrder.courierId.toString(),
        status: OrderStates.INCOMING
      }, 'invalid-uuid')
    ).rejects.toBeInstanceOf(InvalidIdError);
  });

  it('should NOT be able to update an order with invalid recipientId', async () => {
    const fakeOrder = makeOrder({ status: OrderStates.WAITING });

    repository.create(fakeOrder);

    await expect(() =>
      sut.execute({ 
        recipientId: 'invalid-uuid',
        courierId: fakeOrder.courierId.toString(),
        status: OrderStates.INCOMING
      }, fakeOrder.id.toString())
    ).rejects.toBeInstanceOf(InvalidIdError);
  });

  it('should NOT be able to update an order with invalid courierId', async () => {
    const fakeOrder = makeOrder({ status: OrderStates.WAITING });

    repository.create(fakeOrder);

    await expect(() =>
      sut.execute({ 
        recipientId: fakeOrder.recipientId.toString(),
        courierId: 'invalid-uuid',
        status: OrderStates.INCOMING
      }, fakeOrder.id.toString())
    ).rejects.toBeInstanceOf(InvalidIdError);
  });

  it('should NOT be able to update an order without passing all required arguments', async () => {
    const fakeOrder = makeOrder({ status: OrderStates.WAITING });

    repository.create(fakeOrder);

    await expect(() =>
      sut.execute({ 
        recipientId: fakeOrder.recipientId.toString(),
        courierId: null,
        status: OrderStates.INCOMING
      }, fakeOrder.id.toString())
    ).rejects.toBeInstanceOf(InsuficientArgumentsError);
  });
});
