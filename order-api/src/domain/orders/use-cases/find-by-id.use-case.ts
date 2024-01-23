import { Injectable } from '@nestjs/common';
import { IOrdersRepository } from '@repositories/orders.repository';
import { isUUID } from '@validator/types-validator';
import { Order } from '@entities/order.entity';
import { InvalidIdError } from '@errors/custom-errors';

interface FindByIdUseCaseResponse {
  order: Order
}

@Injectable()
export class FindByIdUseCase {
  constructor(
    private ordersRepository: IOrdersRepository
  ){}

  async execute(id: string): Promise<FindByIdUseCaseResponse> {
    if (!isUUID(id)) throw new InvalidIdError(id);

    const order = await this.ordersRepository.findById(id);

    return { order };
  }
}
