import { Injectable } from '@nestjs/common';
import { ICouriersRepository } from '../repositories/couriers.repository';
import { isEmail } from 'src/core/utils/email-validator';
import { Courier } from '../entities/courier.entity';
import { InvalidEmailError } from 'src/core/errors/custom-errors';

interface FindByEmailUseCaseResponse {
  courier: Courier
}

@Injectable()
export class FindByEmailUseCase {
  constructor(
    private couriersRepository: ICouriersRepository
  ){}

  async execute(email: string): Promise<FindByEmailUseCaseResponse> {
    if (!isEmail(email)) throw new InvalidEmailError(email);

    const courier = await this.couriersRepository.findByEmail(email);

    return { courier };
  }
}
