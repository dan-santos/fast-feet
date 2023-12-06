import { Injectable } from '@nestjs/common';
import { ICouriersRepository } from '../repositories/couriers.repository';
import { isEmail } from 'src/core/utils/email-validator';
import { InvalidEmailError, ResourceNotFoundError } from 'src/core/errors/custom-errors';

@Injectable()
export class DeleteUseCase {
  constructor(
    private couriersRepository: ICouriersRepository
  ){}

  async execute(email: string) {
    if (!isEmail(email)) throw new InvalidEmailError(email);

    const courierExists = await this.couriersRepository.findByEmail(email);

    if (!courierExists) throw new ResourceNotFoundError('courier');

    await this.couriersRepository.delete(email);
  }
}
