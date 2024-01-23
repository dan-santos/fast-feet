import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { IOrdersRepository } from '@repositories/orders.repository';
import { PrismaOrdersRepository } from './prisma/repositories/prisma-orders.repository';

@Module({
  providers: [
    PrismaService,
    { provide: IOrdersRepository, useClass: PrismaOrdersRepository },
  ],
  exports: [
    PrismaService,
    IOrdersRepository,
  ]
})
export class DatabaseModule {}