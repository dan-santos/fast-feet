import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '@dto/create-order.dto';
import { IOrdersRepository } from '@repositories/orders.repository';
import { Order } from '@entities/order.entity';
import { isUUID } from '@validator/types-validator';
import { InvalidIdError } from '@errors/custom-errors';
import { OrderStates } from '@validator/order-states.enum';
import { UniqueEntityID } from '@core/unique-entity-id';

@Injectable()
export class CreateUseCase {
  constructor(
    private ordersRepository: IOrdersRepository
  ){}

  async execute(createOrderDto: CreateOrderDto) {
    const { recipientId } = createOrderDto;

    if (!isUUID(recipientId)) throw new InvalidIdError(recipientId);

    const order = Order.create({
      recipientId: new UniqueEntityID(recipientId),
      courierId: null,
      status: OrderStates.WAITING 
    });
    await this.ordersRepository.create(order);
  }
}
