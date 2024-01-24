import { Module } from '@nestjs/common';
import { KafkaService } from './kafka/kafka.service';
import { EnvModule } from '@env/env.module';

@Module({
  providers: [
    KafkaService
  ],
  exports: [
    KafkaService
  ],
  imports: [EnvModule]
})
export class MessagesModule {}
