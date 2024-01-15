import { Injectable } from '@nestjs/common';
import { IRecipientsRepository } from '@repositories/recipients.repository';
import { Recipient } from '@entities/recipient.entity';
import { PaginationParams } from 'src/core/pagination-params';

interface FindManyUseCaseResponse {
  recipients: Recipient[]
}

@Injectable()
export class FindManyUseCase {
  constructor(
    private recipientsRepository: IRecipientsRepository
  ){}

  async execute(params?: PaginationParams): Promise<FindManyUseCaseResponse> {
    const recipients = await this.recipientsRepository.findMany({ 
      take: params?.take || 10,
      skip: params?.skip || 0
    });

    return { recipients };
  }
}
