import { EnvService } from '@env/env.service';
import { MessagePayload, updateOrder } from '@events/message-received.event';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka;
  private logger = new Logger('KafkaJS');

  constructor(
    private readonly env: EnvService
  ){
    this.kafka = new Kafka({
      brokers: [this.env.get('KAFKA_BROKER')],
      sasl: {
        mechanism: 'scram-sha-256',
        username: this.env.get('KAFKA_USER'),
        password: this.env.get('KAFKA_PASSWORD'),
      },
      ssl: true,
    });
  }
  
  async makeConsumer(): Promise<Consumer> {
    const consumer = this.kafka.consumer({
      groupId: this.env.get('KAFKA_GROUP_ID')
    });
    
    return consumer;
  }
  
  async onModuleInit() {
    const topic = this.env.get('KAFKA_ORDERS_TOPIC');
    const consumer = await this.makeConsumer();

    await consumer.connect();

    await consumer.subscribe({ topic, fromBeginning: true });

    this.logger.log('Order Consumer on Kafka is listenning...');
    await consumer.run({
      eachMessage: async ({ message }) => {
        const data = message.value!.toString();
        const args = JSON.parse(data) as MessagePayload;
        await updateOrder(args);
        this.logger.log(`Message received from ${topic}`);
      }
    });
  }
}