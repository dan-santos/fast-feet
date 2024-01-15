import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { IRecipientsRepository } from '@repositories/recipients.repository';
import { PrismaRecipientsRepository } from './prisma/repositories/prisma-recipients.repository';

@Module({
  providers: [
    PrismaService,
    { provide: IRecipientsRepository, useClass: PrismaRecipientsRepository },
  ],
  exports: [
    PrismaService,
    IRecipientsRepository,
  ]
})
export class DatabaseModule {}
