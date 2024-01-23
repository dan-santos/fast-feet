import { PaginationParams } from 'src/core/pagination-params';
import { Order } from '@entities/order.entity';
import { IOrdersRepository } from '@repositories/orders.repository';

export class InMemoryOrdersRepository implements IOrdersRepository {
  public items: Order[] = [];

  async create(order: Order): Promise<void> {
    this.items.push(order);
  }

  async save(order: Order): Promise<void> {
    const orderIndex = this.items.findIndex(c => c.id.equals(order.id));
    
    this.items[orderIndex] = order;
  }

  async findById(orderId: string): Promise<Order> {
    const order = this.items.find(c => c.id.toString() === orderId);
    if (!order) return null;
    return order;
  }

  async findByRecipient(recipientId: string): Promise<Order> {
    const order = this.items.find(c => c.id.toString() === recipientId);
    if (!order) return null;
    return order;
  }
  
  async findByCourier(courierId: string): Promise<Order> {
    const order = this.items.find(c => c.id.toString() === courierId);
    if (!order) return null;
    return order;
  }

  async delete(id: string): Promise<void> {
    const orderIndex = this.items.findIndex(c => c.id.toString() === id);
    if (orderIndex !== -1) {
      this.items.splice(orderIndex, 1);
    }
  }
  
  async findMany(params: PaginationParams): Promise<Order[]> {
    const { take, skip } = params;

    const orders = this.items.slice(skip, take + skip);

    return orders;
  }
}