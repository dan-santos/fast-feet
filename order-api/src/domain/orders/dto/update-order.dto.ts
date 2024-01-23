import { OrderStates } from '@validator/order-states.enum';

export abstract class UpdateOrderDto {
  courierId: string;
  recipientId: string;
  status: OrderStates;
}