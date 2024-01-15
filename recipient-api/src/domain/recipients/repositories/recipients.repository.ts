import { PaginationParams } from '@core/pagination-params';
import { Recipient } from '@entities/recipient.entity';

export abstract class IRecipientsRepository {
  abstract create(recipient: Recipient): Promise<void>;
  abstract save(recipient: Recipient): Promise<void>;
  abstract findById(recipientId: string): Promise<Recipient | null>;
  abstract findByEmail(recipientEmail: string): Promise<Recipient | null>;
  abstract delete(id: string): Promise<void>;
  abstract findMany(params: PaginationParams): Promise<Recipient[]>;
}