import { UpdateOrderDto } from '@dto/update-order.dto';
import { UpdateUseCase } from '@use-cases/update.use-case';
import { OrderStates } from '@validator/order-states.enum';
import { PrismaOrdersRepository } from 'src/infra/database/prisma/repositories/prisma-orders.repository';

export type MessagePayload = {
  courierId?: string | null,
  orderId: string,
  recipientId: string,
  status: OrderStates
}

const repository = new PrismaOrdersRepository();
const update = new UpdateUseCase(repository);

export async function updateOrder(payload: MessagePayload) {
  const data: UpdateOrderDto = {
    courierId: payload.courierId,
    recipientId: payload.recipientId,
    status: payload.status
  };

  await update.execute(data, payload.orderId);
}