import { PaginationParams } from '@core/pagination-params';
import { Order } from '@entities/order.entity';
import { PrismaClient } from '@prisma/client';
import { IOrdersRepository } from '@repositories/orders.repository';
import { PrismaOrderMapper } from '../mappers/order-mapper';

export class PrismaOrdersRepository implements IOrdersRepository {
  private prisma = new PrismaClient();

  async findByRecipient(recipientId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        recipientId
      },
    });

    return orders.map(PrismaOrderMapper.toDomain);
  }

  async findByCourier(courierId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        courierId
      },
    });

    return orders.map(PrismaOrderMapper.toDomain);
  }
  
  async save(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toDatabase(order);
    
    await this.prisma.order.update({ 
      where: {
        id: data.id,
      },
      data,
    });
  }
  
  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({
      where: {
        id
      },
    });
  }
  
  async findMany(params: PaginationParams): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      take: params.take,
      skip: params.skip
    });

    return orders.map(PrismaOrderMapper.toDomain);
  }
  
  async create(order: Order): Promise<void> {
    const data = PrismaOrderMapper.toDatabase(order);

    await this.prisma.order.create({ data });
  }
  
  async findById(orderId: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) return null;

    return PrismaOrderMapper.toDomain(order);
  }
}