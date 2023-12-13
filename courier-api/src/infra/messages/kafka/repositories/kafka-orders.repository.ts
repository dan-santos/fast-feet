import { IOrdersRepository, messagePayload } from '@repositories/orders.repository';
import { KafkaService } from '../kafka.service';
import { Producer } from 'kafkajs';
import { Injectable } from '@nestjs/common';
@Injectable()
export class KafkaOrdersRepository implements IOrdersRepository {
  private producer: Producer;

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
          })
        }
      ]
    });
    await this.producer.disconnect();
  }
}