import { UniqueEntityID } from '@core/unique-entity-id';
import { Recipient } from '@entities/recipient.entity';
import { Prisma, Recipient as PrismaRecipient } from '@prisma/client';

export class PrismaRecipientMapper {
  static toDomain(raw: PrismaRecipient): Recipient {
    return Recipient.create(
      {
        email: raw.email,
        name: raw.name,
        number: raw.number,
        street: raw.street,
        zipCode: raw.zipCode
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toDatabase(raw: Recipient): Prisma.RecipientUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      email: raw.email,
      name: raw.name,
      number: raw.number,
      street: raw.street,
      zipCode: raw.zipCode
    };
  }
}