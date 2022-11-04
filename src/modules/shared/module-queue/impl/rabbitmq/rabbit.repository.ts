import { Injectable } from '@nestjs/common';
import { IQueueRepository } from '../../queue.repository';
import { IQueueMessage } from '../../queue.type';
import { Queue, Connection, Exchange, Message } from 'amqp-ts';
import { ExchangeType } from './rabbit.enum';
import { pack, unpack } from 'jsonpack';

@Injectable()
export class RabbitRepository implements IQueueRepository {
  constructor(private readonly connection: Connection) {}

  private declareExchange(
    name: string,
    type: ExchangeType = ExchangeType.FANOUT,
  ): Exchange {
    return this.connection.declareExchange(name, type, { durable: true });
  }

  private compressMessage(message: any) {
    return pack(message);
  }

  private async declareQueue(
    name: string,
    exchange?: Exchange,
    routingKey?: string,
  ): Promise<Queue> {
    const queue = this.connection.declareQueue(name, { durable: true });
    if (exchange) {
      if (routingKey) {
        await queue.bind(exchange, routingKey);
      } else {
        await queue.bind(exchange);
      }
    }
    return queue;
  }

  public publish(
    message: IQueueMessage<any>,
    topic: string,
    routingKey?: string,
  ): void {
    const exchange = this.declareExchange(topic);
    const compressed = this.compressMessage(message);
    const rabbitMessage = new Message(compressed, { persistent: true });
    return exchange.send(rabbitMessage, routingKey);
  }
  public async consume(
    topic: string,
    domain: string,
    handler: (message: any) => any,
  ): Promise<void> {
    const exchange = this.declareExchange(topic);
    const queue = await this.declareQueue(`${domain}-${topic}`, exchange);
    await queue.activateConsumer(handler);
    return;
  }

  public uncompressMessage<T>(message: string): T {
    return unpack<T>(message);
  }
}
