import { Injectable } from '@nestjs/common';
import { UpdateOrderDto } from '@dto/update-order.dto';
import { IOrdersRepository } from '@repositories/orders.repository';
import { Order } from '@entities/order.entity';
import { isUUID } from '@validator/types-validator';
import { InsuficientArgumentsError, InvalidIdError } from '@errors/custom-errors';
import { UniqueEntityID } from '@core/unique-entity-id';

@Injectable()
export class UpdateUseCase {
  constructor(
    private ordersRepository: IOrdersRepository
  ){}

  async execute(updateOrderDto: UpdateOrderDto, id: string) {
    const { recipientId, courierId, status } = updateOrderDto;

    if (!recipientId || !courierId || !status || !id) {
      throw new InsuficientArgumentsError('update');
    }

    if (!isUUID(id)) throw new InvalidIdError(id);
    if (!isUUID(recipientId)) throw new InvalidIdError(recipientId);
    if (!isUUID(courierId)) throw new InvalidIdError(courierId);

    const order = Order.create(
      {
        recipientId: new UniqueEntityID(recipientId),
        courierId: new UniqueEntityID(courierId),
        status
      },
      new UniqueEntityID(id)
    );
    await this.ordersRepository.save(order);
  }
}
