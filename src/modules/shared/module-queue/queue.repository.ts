import { IQueueMessage, IConsumerOptions, IPublishOptions } from './queue.type';

export interface IQueueRepository {
  publish(
    message: IQueueMessage<any>,
    topic: string,
    routingKey?: string,
    options?: IPublishOptions,
  ): Promise<void> | void;
  sendMessageToQueue<T>(
    message: IQueueMessage<T>,
    queueName: string,
  ): Promise<void> | void;
  consume(
    domain: string,
    handler: (message: any) => any,
    topic?: string,
    options?: IConsumerOptions,
  ): void;
  uncompressMessage<T>(message: string): T;
}
