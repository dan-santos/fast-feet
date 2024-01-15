import { Injectable } from '@nestjs/common';
import { IRecipientsRepository } from '@repositories/recipients.repository';
import { isUUID } from '@validator/types-validator';
import { InvalidIdError } from '@errors/custom-errors';

@Injectable()
export class DeleteUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ){}

  async execute(id: string) {
    if (!isUUID(id)) throw new InvalidIdError(id);
    await this.recipientsRepository.delete(id);
  }
}
