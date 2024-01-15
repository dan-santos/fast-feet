import { PaginationParams } from 'src/core/pagination-params';
import { Recipient } from '@entities/recipient.entity';
import { IRecipientsRepository } from '@repositories/recipients.repository';

export class PrismaRecipientsRepository implements IRecipientsRepository {
  save(recipient: Recipient): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findMany(params: PaginationParams): Promise<Recipient[]> {
    throw new Error('Method not implemented.');
  }
  create(recipient: Recipient): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(recipientId: string): Promise<Recipient> {
    throw new Error('Method not implemented.');
  }
  findByEmail(recipientEmail: string): Promise<Recipient> {
    throw new Error('Method not implemented.');
  }
}