import { IQueueMessage, IConsumerOptions, IPublishOptions } from './queue.type';

export interface IQueueRepository {
  publish(
    message: IQueueMessage<any>,
    topic: string,
    routingKey?: string,
    options?: IPublishOptions,
  ): Promise<void> | void;
  consume(
    topic: string,
    domain: string,
    handler: (message: any) => any,
    options?: IConsumerOptions,
  ): void;
  uncompressMessage<T>(message: string): T;
}
