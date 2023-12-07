import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ICouriersRepository } from '@repositories/couriers.repository';
import { PrismaCouriersRepository } from './prisma/repositories/prisma-couriers.repository';

@Module({
  providers: [
    PrismaService,
    { provide: ICouriersRepository, useClass: PrismaCouriersRepository },
  ],
  exports: [
    PrismaService,
    ICouriersRepository,
  ]
})
export class DatabaseModule {}