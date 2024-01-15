import { UniqueEntityID } from 'src/core/unique-entity-id';
import { Recipient, RecipientProps } from '@entities/recipient.entity';
import { fakerPT_BR as faker } from '@faker-js/faker';

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityID,
) {
  const fakeRecipient = Recipient.create({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    street: faker.location.streetAddress(),
    number: faker.location.buildingNumber().toString(),
    zipCode: faker.location.zipCode({ format: '#####-###' }),
    ...override,
  },
  id,
  );

  return fakeRecipient;
}