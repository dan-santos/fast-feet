import { EnvService } from '@env/env.service';
import { Injectable } from '@nestjs/common';
import { Kafka, Partitioners, Producer } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka: Kafka;

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

  makeProducer(): Producer {
    const producer = this.kafka.producer({
      allowAutoTopicCreation: true,
      createPartitioner: Partitioners.LegacyPartitioner
    });

    return producer;
  }
}