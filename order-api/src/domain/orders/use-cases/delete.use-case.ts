import { Injectable } from '@nestjs/common';
import { IOrdersRepository } from '@repositories/orders.repository';
import { isUUID } from '@validator/types-validator';
import { InvalidIdError } from '@errors/custom-errors';

@Injectable()
export class DeleteUseCase {
  constructor(
    private ordersRepository: IOrdersRepository
  ){}

  async execute(id: string) {
    if (!isUUID(id)) throw new InvalidIdError(id);
    await this.ordersRepository.delete(id);
  }
}
