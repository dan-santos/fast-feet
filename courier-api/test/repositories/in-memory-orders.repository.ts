import { IOrdersRepository, messagePayload } from '@repositories/orders.repository';

interface Topic {
  name: string,
  messages: messagePayload[]
}

export class InMemoryOrdersRepository implements IOrdersRepository {
  public topics: Topic[] = [];

  async sendMessage(topic: string, payload: messagePayload): Promise<void> {
    const topicExists = this.topics.find(t => t.name === topic);
    if (!topicExists) {
      this.topics.push({ name: topic, messages: [] });
    }
    this.topics.find(t => t.name === topic).messages.push(payload);
  }
}