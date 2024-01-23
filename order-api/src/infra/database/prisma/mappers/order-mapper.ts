import { UniqueEntityID } from '@core/unique-entity-id';
import { Order } from '@entities/order.entity';
import { Prisma, Order as PrismaOrder } from '@prisma/client';
import { stringToEnum } from '@validator/order-states.enum';

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder): Order {
    return Order.create(
      {
        recipientId: new UniqueEntityID(raw.recipientId),
        courierId: new UniqueEntityID(raw.courierId),
        status: stringToEnum(raw.status)
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDatabase(raw: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      recipientId: raw.recipientId.toString(),
      courierId: raw.courierId.toString(),
      status: raw.status
    };
  }
}