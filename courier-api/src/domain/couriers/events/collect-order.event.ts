import { Injectable } from '@nestjs/common';
import { isUUID } from '@validator/types-validator';
import { InvalidIdError } from '@errors/custom-errors';
import { IOrdersRepository } from '@repositories/orders.repository';
import { CollectOrderDto } from '@dto/collect-order.dto';
import { OrderStates } from '@validator/order-states.enum';

@Injectable()
export class CollectOrderEvent {
  constructor(
    private ordersRepository: IOrdersRepository,
  ){}

  async execute(props: CollectOrderDto) {
    const { courierId, orderId } = props;

    if (!isUUID(courierId)) throw new InvalidIdError(courierId);
    if (!isUUID(orderId)) throw new InvalidIdError(orderId);

    await this.ordersRepository.sendMessage(
      'ORDERS',
      {
        orderId,
        courierId,
        status: OrderStates.INCOMING
      }
    );
  }
}
