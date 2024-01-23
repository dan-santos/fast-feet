import { PaginationParams } from '@core/pagination-params';
import { Order } from '@entities/order.entity';

export abstract class IOrdersRepository {
  abstract create(order: Order): Promise<void>;
  abstract save(order: Order): Promise<void>;
  abstract findById(orderId: string): Promise<Order | null>;
  abstract findByRecipient(recipientId: string): Promise<Order | null>;
  abstract findByCourier(courierId: string): Promise<Order | null>;
  abstract delete(id: string): Promise<void>;
  abstract findMany(params: PaginationParams): Promise<Order[]>;
}