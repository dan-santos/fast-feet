import { UniqueEntityID } from 'src/core/unique-entity-id';
import { Courier, CourierProps } from 'src/domain/couriers/entities/courier.entity';
import { fakerPT_BR as faker } from '@faker-js/faker';

export function makeCourier(
  override: Partial<CourierProps> = {},
  id?: UniqueEntityID,
) {
  const fakeCourier = Courier.create({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    lat: faker.number.float({ min: -180.0, max: 180.0 }),
    lon: faker.number.float({ min: -90.0, max: 90.0 }),
    ...override,
  },
  id,
  );

  return fakeCourier;
}