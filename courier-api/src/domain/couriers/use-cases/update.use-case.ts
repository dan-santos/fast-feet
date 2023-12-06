import { Injectable } from '@nestjs/common';
import { UpdateCourierDto } from '../dto/update-courier.dto';
import { ICouriersRepository } from '../repositories/couriers.repository';
import { Courier } from '../entities/courier.entity';
import { isEmail } from 'src/core/utils/email-validator';
import { ConflictError, InsuficientArgumentsError, InvalidEmailError } from 'src/core/errors/custom-errors';
import { UniqueEntityID } from 'src/core/unique-entity-id';

@Injectable()
export class UpdateUseCase {
  constructor(
    private couriersRepository: ICouriersRepository
  ){}

  async execute(id: string, updateCourierDto: UpdateCourierDto) {
    if (!updateCourierDto.email && !updateCourierDto.name && !updateCourierDto.lat && !updateCourierDto.lon) {
      throw new InsuficientArgumentsError('update');
    }

    const { email } = updateCourierDto;

    if (email) {
      if (!isEmail(email)) throw new InvalidEmailError(email);

      const courier = await this.couriersRepository.findByEmail(email);
      if (courier) throw new ConflictError('courier');
    }

    const updatedCourier = Courier.create(
      {
        email,
        name: updateCourierDto.name,
        lat: updateCourierDto.lat,
        lon: updateCourierDto.lon
      },
      new UniqueEntityID(id)
    );

    await this.couriersRepository.save(updatedCourier);
  }
}
