import { Injectable } from '@nestjs/common';
import { CreateCourierDto } from '../dto/create-courier.dto';
import { ICouriersRepository } from '../repositories/couriers.repository';
import { Courier } from '../entities/courier.entity';
import { isEmail } from 'src/core/utils/email-validator';
import { ConflictError, InvalidEmailError } from 'src/core/errors/custom-errors';

@Injectable()
export class CreateUseCase {
  constructor(
    private couriersRepository: ICouriersRepository
  ){}

  async execute(createCourierDto: CreateCourierDto) {
    const { email, name } = createCourierDto;

    if (!isEmail(email)) throw new InvalidEmailError(email);

    const courierAlreadyExists = await this.couriersRepository.findByEmail(email);

    if (courierAlreadyExists) throw new ConflictError('courier');

    const courier = Courier.create({ email, name });
    await this.couriersRepository.create(courier);
  }
}
