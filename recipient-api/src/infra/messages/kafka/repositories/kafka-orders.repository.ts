import { IOrdersRepository, messagePayload } from '@repositories/orders.repository';
import { KafkaService } from '../kafka.service';
import { Producer } from 'kafkajs';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class KafkaOrdersRepository implements IOrdersRepository {
  private producer: Producer;
  private logger = new Logger('KafkaJS');

  constructor(
    private kafkaService: KafkaService,
  ){}
  
  async sendMessage(topic: string, payload: messagePayload): Promise<void> {
    this.producer = this.kafkaService.makeProducer();
    const { courierId, orderId, status } = payload;
    await this.producer.connect();

    await this.producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify({
            orderId,
            courierId,
            status,
            createdAt: new Date().toISOString()
          }),
          key: orderId,
        }
      ]
    });

    await this.producer.disconnect();

    this.logger.log(`[${orderId}] with status ${status} has been sent to topic`);
  }
}