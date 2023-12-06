import { Injectable } from '@nestjs/common';
import { UpdateCourierDto } from '../dto/update-courier.dto';
import { ICouriersRepository } from '../repositories/couriers.repository';
import { Courier } from '../entities/courier.entity';
import { isEmail } from 'src/core/utils/email-validator';
import { InsuficientArgumentsError, InvalidEmailError, ResourceNotFoundError } from 'src/core/errors/custom-errors';

@Injectable()
export class UpdateUseCase {
  constructor(
    private couriersRepository: ICouriersRepository
  ){}

  async execute(updateCourierDto: UpdateCourierDto) {
    const { email } = updateCourierDto;

    if (!isEmail(email)) throw new InvalidEmailError(email);

    if (!updateCourierDto.name && !updateCourierDto.lat && !updateCourierDto.lon) {
      throw new InsuficientArgumentsError('update');
    }

    const courier = await this.couriersRepository.findByEmail(email);

    if (!courier) throw new ResourceNotFoundError('courier');

    const updatedCourier = Courier.create(
      {
        email,
        name: updateCourierDto.name ?? courier.name,
        lat: updateCourierDto.lat ?? courier.lat,
        lon: updateCourierDto.lon ?? courier.lon
      },
      courier.id
    );

    await this.couriersRepository.save(updatedCourier);
  }
}
