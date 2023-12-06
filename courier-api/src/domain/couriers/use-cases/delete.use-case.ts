import { Injectable } from '@nestjs/common';
import { ICouriersRepository } from '../repositories/couriers.repository';
import { isUUID } from 'src/core/utils/types-validator';
import { InvalidIdError } from 'src/core/errors/custom-errors';

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
