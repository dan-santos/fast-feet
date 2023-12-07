import { Injectable } from '@nestjs/common';
import { UpdateCourierDto } from '@dto/update-courier.dto';
import { ICouriersRepository } from '@repositories/couriers.repository';
import { Courier } from '@entities/courier.entity';
import { isEmail, isUUID } from '@validator/types-validator';
import { 
  ConflictError, InsuficientArgumentsError, InvalidEmailError, InvalidIdError 
} from '@errors/custom-errors';
import { UniqueEntityID } from '@core/unique-entity-id';

@Injectable()
export class UpdateUseCase {
  constructor(
    private couriersRepository: ICouriersRepository
  ){}

  async execute(updateCourierDto: UpdateCourierDto, id: string) {
    if (!updateCourierDto.email && !updateCourierDto.name && !updateCourierDto.lat && !updateCourierDto.lon) {
      throw new InsuficientArgumentsError('update');
    }

    if (!isUUID(id)) throw new InvalidIdError(id);

    const { email } = updateCourierDto;

    if (email) {
      if (!isEmail(email)) throw new InvalidEmailError(email);

      const courier = await this.couriersRepository.findByEmail(email);
      if (courier) throw new ConflictError('courier');
    }

    const courier = await this.couriersRepository.findById(id);
    const updatedCourier = Courier.create(
      {
        email: updateCourierDto.email ?? courier.email,
        name: updateCourierDto.name ?? courier.name,
        lat: updateCourierDto.lat ?? courier.lat,
        lon: updateCourierDto.lon ?? courier.lon
      },
      new UniqueEntityID(id)
    );

    await this.couriersRepository.save(updatedCourier);
  }
}
