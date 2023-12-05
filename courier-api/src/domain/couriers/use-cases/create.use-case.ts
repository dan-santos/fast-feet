import { Injectable } from '@nestjs/common';
import { CreateCourierDto } from '../dto/create-courier.dto';
import { ICouriersRepository } from '../repositories/couriers.repository';
import { Courier } from '../entities/courier.entity';
import { isEmail } from 'src/core/utils/email-validator';

@Injectable()
export class CreateUseCase {
  constructor(
    private couriersRepository: ICouriersRepository
  ){}

  async execute(createCourierDto: CreateCourierDto) {
    const { email, name } = createCourierDto;

    if (!isEmail(email)) throw new Error(`"${email}" is not a valid email.`);

    const courierAlreadyExists = await this.couriersRepository.findByEmail(email);

    if (courierAlreadyExists) throw new Error(`Courier with email "${email}" already exists.`);

    const courier = Courier.create({ email, name });
    await this.couriersRepository.create(courier);
  }
}
