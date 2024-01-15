import { OrderStates } from '@validator/order-states.enum';

export interface messagePayload {
  orderId: string;
  recipientId: string;
  courierId?: string | null;
  status: OrderStates;
}

export abstract class IOrdersRepository {
  abstract sendMessage(topic: string, payload: messagePayload): Promise<void>;
}