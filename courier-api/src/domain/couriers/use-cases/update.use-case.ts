import { Injectable } from '@nestjs/common';
import { UpdateCourierDto } from '../dto/update-courier.dto';
import { ICouriersRepository } from '../repositories/couriers.repository';
import { Courier } from '../entities/courier.entity';
import { isEmail } from 'src/core/utils/email-validator';

@Injectable()
export class UpdateUseCase {
  constructor(
    private couriersRepository: ICouriersRepository
  ){}

  async execute(updateCourierDto: UpdateCourierDto) {
    const { email } = updateCourierDto;

    if (!isEmail(email)) throw new Error(`"${email}" is not a valid email.`);

    if (!updateCourierDto.name && !updateCourierDto.lat && !updateCourierDto.lon) {
      throw new Error(`Unable to update courier "${email}" without any arguments to update.`);
    }

    const courier = await this.couriersRepository.findByEmail(email);

    if (!courier) throw new Error(`Courier with email "${email}" doesnt exists.`);

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
