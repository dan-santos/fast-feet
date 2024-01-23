import { PaginationParams } from '@core/pagination-params';
import { Order } from '@entities/order.entity';
import { IOrdersRepository } from '@repositories/orders.repository';

export class PrismaOrdersRepository implements IOrdersRepository {
  findByRecipient(recipientId: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  findByCourier(courierId: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  save(order: Order): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findMany(params: PaginationParams): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
  create(order: Order): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(orderId: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }
}