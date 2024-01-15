import { Injectable } from '@nestjs/common';
import { CreateRecipientDto } from '@dto/create-recipient.dto';
import { IRecipientsRepository } from '@repositories/recipients.repository';
import { Recipient } from '@entities/recipient.entity';
import { isEmail } from '@validator/types-validator';
import { ConflictError, InvalidEmailError } from '@errors/custom-errors';

@Injectable()
export class CreateUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ){}

  async execute(createRecipientDto: CreateRecipientDto) {
    const { email, name, number, street, zipCode } = createRecipientDto;

    if (!isEmail(email)) throw new InvalidEmailError(email);

    const recipientAlreadyExists = await this.recipientsRepository.findByEmail(email);

    if (recipientAlreadyExists) throw new ConflictError('recipient');

    const recipient = Recipient.create({ email, name, number, street, zipCode });
    await this.recipientsRepository.create(recipient);
  }
}
