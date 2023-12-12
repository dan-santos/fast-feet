import { Module } from '@nestjs/common';
import { IOrdersRepository } from '@repositories/orders.repository';
import { KafkaOrdersRepository } from './kafka/repositories/kafka-orders.repository';
import { KafkaService } from './kafka/kafka.service';
import { EnvModule } from '@env/env.module';

@Module({
  providers: [
    KafkaService,
    { provide: IOrdersRepository, useClass: KafkaOrdersRepository }
  ],
  exports: [
    IOrdersRepository,
    KafkaService
  ],
  imports: [EnvModule]
})
export class MessagesModule {}
