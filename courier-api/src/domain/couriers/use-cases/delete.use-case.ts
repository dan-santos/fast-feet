import { Injectable } from '@nestjs/common';
import { ICouriersRepository } from '../repositories/couriers.repository';
import { isEmail } from 'src/core/utils/email-validator';

@Injectable()
export class DeleteUseCase {
  constructor(
    private couriersRepository: ICouriersRepository
  ){}

  async execute(email: string) {
    if (!isEmail(email)) throw new Error(`"${email}" is not a valid email.`);

    const courierExists = await this.couriersRepository.findByEmail(email);

    if (!courierExists) throw new Error(`Courier with email "${email}" doesnt exists.`);

    await this.couriersRepository.delete(email);
  }
}
