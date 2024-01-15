import { Injectable } from '@nestjs/common';
import { IRecipientsRepository } from '@repositories/recipients.repository';
import { isUUID } from '@validator/types-validator';
import { Recipient } from '@entities/recipient.entity';
import { InvalidIdError } from '@errors/custom-errors';

interface FindByIdUseCaseResponse {
  recipient: Recipient
}

@Injectable()
export class FindByIdUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ){}

  async execute(id: string): Promise<FindByIdUseCaseResponse> {
    if (!isUUID(id)) throw new InvalidIdError(id);

    const recipient = await this.recipientsRepository.findById(id);

    return { recipient };
  }
}
