import { UniqueEntityID } from '@core/unique-entity-id';
import { Courier } from '@entities/courier.entity';
import { Prisma, Courier as PrismaCourier } from '@prisma/client';

export class PrismaCourierMapper {
  static toDomain(raw: PrismaCourier): Courier {
    return Courier.create(
      {
        email: raw.email,
        name: raw.name,
        lat: raw.lat,
        lon: raw.lon
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDatabase(raw: Courier): Prisma.CourierUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      email: raw.email,
      name: raw.name,
      lat: raw.lat,
      lon: raw.lon
    };
  }
}