import { Injectable } from '@nestjs/common';
import { ICouriersRepository } from '../repositories/couriers.repository';
import { isUUID } from 'src/core/utils/types-validator';
import { Courier } from '../entities/courier.entity';
import { InvalidIdError } from 'src/core/errors/custom-errors';

interface FindByIdUseCaseResponse {
  courier: Courier
}

@Injectable()
export class FindByIdUseCase {
  constructor(
    private couriersRepository: ICouriersRepository
  ){}

  async execute(id: string): Promise<FindByIdUseCaseResponse> {
    if (!isUUID(id)) throw new InvalidIdError(id);

    const courier = await this.couriersRepository.findById(id);

    return { courier };
  }
}
