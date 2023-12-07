import { Injectable } from '@nestjs/common';
import { ICouriersRepository } from '@repositories/couriers.repository';
import { isUUID } from '@validator/types-validator';
import { InvalidIdError } from '@errors/custom-errors';

@Injectable()
export class DeleteUseCase {
  constructor(
    private couriersRepository: ICouriersRepository
  ){}

  async execute(id: string) {
    if (!isUUID(id)) throw new InvalidIdError(id);
    await this.couriersRepository.delete(id);
  }
}
