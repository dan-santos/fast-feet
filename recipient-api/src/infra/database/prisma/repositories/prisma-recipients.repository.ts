import { PaginationParams } from '@core/pagination-params';
import { Recipient } from '@entities/recipient.entity';
import { IRecipientsRepository } from '@repositories/recipients.repository';
import { PrismaService } from '../prisma.service';
import { PrismaRecipientMapper } from '../mappers/recipient-mapper';

export class PrismaRecipientsRepository implements IRecipientsRepository {
  private prisma = new PrismaService();

  async save(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMapper.toDatabase(recipient);
    
    await this.prisma.recipient.update({ 
      where: {
        id: data.id,
      },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.recipient.delete({
      where: {
        id
      },
    });
  }

  async findMany(params: PaginationParams): Promise<Recipient[]> {
    const recipients = await this.prisma.recipient.findMany({
      take: params.take,
      skip: params.skip
    });

    return recipients.map(PrismaRecipientMapper.toDomain);
  }

  async create(recipient: Recipient): Promise<void> {
    const data = PrismaRecipientMapper.toDatabase(recipient);

    await this.prisma.recipient.create({ data });
  }

  async findById(recipientId: string): Promise<Recipient> {
    const recipient = await this.prisma.recipient.findUnique({
      where: {
        id: recipientId,
      },
    });

    if (!recipient) return null;

    return PrismaRecipientMapper.toDomain(recipient);
  }

  async findByEmail(recipientEmail: string): Promise<Recipient> {
    const recipient = await this.prisma.recipient.findUnique({
      where: {
        email: recipientEmail,
      },
    });

    if (!recipient) return null;

    return PrismaRecipientMapper.toDomain(recipient);
  }
}