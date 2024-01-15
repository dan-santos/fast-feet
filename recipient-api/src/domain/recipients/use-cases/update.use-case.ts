import { Injectable } from '@nestjs/common';
import { UpdateRecipientDto } from '@dto/update-recipient.dto';
import { IRecipientsRepository } from '@repositories/recipients.repository';
import { Recipient } from '@entities/recipient.entity';
import { isEmail, isUUID } from '@validator/types-validator';
import { 
  ConflictError, InsuficientArgumentsError, InvalidEmailError, InvalidIdError 
} from '@errors/custom-errors';
import { UniqueEntityID } from '@core/unique-entity-id';

@Injectable()
export class UpdateUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ){}

  async execute(updateRecipientDto: UpdateRecipientDto, id: string) {
    if (!updateRecipientDto.email && !updateRecipientDto.name && !updateRecipientDto.lat && !updateRecipientDto.lon) {
      throw new InsuficientArgumentsError('update');
    }

    if (!isUUID(id)) throw new InvalidIdError(id);

    const { email } = updateRecipientDto;

    if (email) {
      if (!isEmail(email)) throw new InvalidEmailError(email);

      const recipient = await this.recipientsRepository.findByEmail(email);
      if (recipient) throw new ConflictError('recipient');
    }

    const recipient = await this.recipientsRepository.findById(id);
    const updatedRecipient = Recipient.create(
      {
        email: updateRecipientDto.email ?? recipient.email,
        name: updateRecipientDto.name ?? recipient.name,
        lat: updateRecipientDto.lat ?? recipient.lat,
        lon: updateRecipientDto.lon ?? recipient.lon
      },
      new UniqueEntityID(id)
    );

    await this.recipientsRepository.save(updatedRecipient);
  }
}
