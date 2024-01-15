import { Injectable } from '@nestjs/common';
import { isUUID } from '@validator/types-validator';
import { InvalidIdError } from '@errors/custom-errors';
import { IOrdersRepository } from '@repositories/orders.repository';
import { ReturnOrderDto } from '@dto/return-order.dto';
import { OrderStates } from '@validator/order-states.enum';

@Injectable()
export class ReturnOrderEvent {
  constructor(
    private ordersRepository: IOrdersRepository,
  ){}

  async execute(props: ReturnOrderDto) {
    const { recipientId, orderId } = props;

    if (!isUUID(recipientId)) throw new InvalidIdError(recipientId);
    if (!isUUID(orderId)) throw new InvalidIdError(orderId);

    await this.ordersRepository.sendMessage(
      'ORDERS',
      {
        orderId,
        recipientId,
        status: OrderStates.RETURNED,
        courierId: null
      }
    );
  }
}
