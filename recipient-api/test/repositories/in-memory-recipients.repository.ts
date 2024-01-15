import { PaginationParams } from 'src/core/pagination-params';
import { Recipient } from '@entities/recipient.entity';
import { IRecipientsRepository } from '@repositories/recipients.repository';

export class InMemoryRecipientsRepository implements IRecipientsRepository {
  public items: Recipient[] = [];

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient);
  }

  async save(recipient: Recipient): Promise<void> {
    const recipientIndex = this.items.findIndex(c => c.id.equals(recipient.id));
    
    this.items[recipientIndex] = recipient;
  }

  async findById(recipientId: string): Promise<Recipient> {
    const recipient = this.items.find(c => c.id.toString() === recipientId);
    if (!recipient) return null;
    return recipient;
  }
  
  async findByEmail(recipientEmail: string): Promise<Recipient> {
    const recipient = this.items.find(c => c.email === recipientEmail);
    if (!recipient) return null;
    return recipient;
  }

  async delete(id: string): Promise<void> {
    const recipientIndex = this.items.findIndex(c => c.id.toString() === id);
    if (recipientIndex !== -1) {
      this.items.splice(recipientIndex, 1);
    }
  }
  
  async findMany(params: PaginationParams): Promise<Recipient[]> {
    const { take, skip } = params;

    const recipients = this.items.slice(skip, take + skip);

    return recipients;
  }
}