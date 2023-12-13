import { Injectable } from '@nestjs/common';
import { isUUID } from '@validator/types-validator';
import { InvalidIdError } from '@errors/custom-errors';
import { IOrdersRepository } from '@repositories/orders.repository';
import { DeliverOrderDto } from '@dto/deliver-order.dto';
import { OrderStates } from '@validator/order-states.enum';

@Injectable()
export class DeliverOrderEvent {
  constructor(
    private ordersRepository: IOrdersRepository,
  ){}

  async execute(props: DeliverOrderDto) {
    const { courierId, orderId } = props;

    if (!isUUID(courierId)) throw new InvalidIdError(courierId);
    if (!isUUID(orderId)) throw new InvalidIdError(orderId);

    await this.ordersRepository.sendMessage(
      'DELIVERED_ORDERS',
      {
        orderId,
        courierId,
        status: OrderStates.DELIVERED
      }
    );
  }
}
