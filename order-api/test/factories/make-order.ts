import { UniqueEntityID } from 'src/core/unique-entity-id';
import { Order, OrderProps } from 'src/domain/orders/entities/order.entity';
import { OrderStates } from '@validator/order-states.enum';

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityID,
) {
  const fakeOrder = Order.create({
    courierId: new UniqueEntityID(),
    recipientId: new UniqueEntityID(),
    status: OrderStates.WAITING,
    ...override,
  },
  id,
  );

  return fakeOrder;
}