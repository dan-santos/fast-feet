import { Injectable } from '@nestjs/common';
import { isUUID } from '@validator/types-validator';
import { InvalidIdError } from '@errors/custom-errors';
import { IOrdersRepository } from '@repositories/orders.repository';
import { DeliverOrderDto } from '@dto/deliver-order.dto';
import { OrderStates } from '@validator/order-states.enum';
import { EnvService } from '@env/env.service';

@Injectable()
export class DeliverOrderUseCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private env: EnvService
  ){}

  async execute(props: DeliverOrderDto) {
    const { courierId, orderId } = props;

    if (!isUUID(courierId)) throw new InvalidIdError(courierId);
    if (!isUUID(orderId)) throw new InvalidIdError(orderId);

    await this.ordersRepository.sendMessage(
      this.env.get('KAFKA_DELIVERED_ORDERS_TOPIC'),
      {
        orderId,
        courierId,
        status: OrderStates.DELIVERED
      }
    );
  }
}
