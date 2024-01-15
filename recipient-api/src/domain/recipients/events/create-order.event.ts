import { Injectable } from '@nestjs/common';
import { isUUID } from '@validator/types-validator';
import { InvalidIdError } from '@errors/custom-errors';
import { IOrdersRepository } from '@repositories/orders.repository';
import { CreateOrderDto } from '@dto/create-order.dto';
import { OrderStates } from '@validator/order-states.enum';

@Injectable()
export class CreateOrderEvent {
  constructor(
    private ordersRepository: IOrdersRepository,
  ){}

  async execute(props: CreateOrderDto) {
    const { recipientId, orderId } = props;

    if (!isUUID(recipientId)) throw new InvalidIdError(recipientId);
    if (!isUUID(orderId)) throw new InvalidIdError(orderId);

    await this.ordersRepository.sendMessage(
      'ORDERS',
      {
        orderId,
        recipientId,
        status: OrderStates.WAITING,
        courierId: null
      }
    );
  }
}
