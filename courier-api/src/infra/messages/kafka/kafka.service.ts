import { EnvService } from '@env/env.service';
import { Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService {
  constructor(
    private readonly env: EnvService
  ){}

  makeProducer(): Producer {
    const kafka = new Kafka({
      brokers: [this.env.get('KAFKA_BROKER')],
      sasl: {
        mechanism: 'scram-sha-256',
        username: this.env.get('KAFKA_USER'),
        password: this.env.get('KAFKA_PASSWORD'),
      },
      ssl: true,
    });

    const producer = kafka.producer({
      allowAutoTopicCreation: true,
    });

    return producer;
  }
}