import { Inject, Injectable } from '@nestjs/common';
import { QUEUE_REPO_INJECT } from './queue.constant';
import { IQueueRepository } from './queue.repository';
import { IConsumerOptions, IPublishOptions, IQueueMessage } from './queue.type';

@Injectable()
export class QueueService {
  constructor(
    @Inject(QUEUE_REPO_INJECT)
    private readonly queueRepository: IQueueRepository,
  ) {}

  public async publish(
    qMessage: IQueueMessage<any>,
    topic: string,
    routingKey?: string,
    options?: IPublishOptions,
  ): Promise<void> {
    return this.queueRepository.publish(qMessage, topic, routingKey, options);
  }

  public async consume(
    topic: string,
    domain: string,
    handler: (message: any) => any,
    options?: IConsumerOptions,
  ): Promise<void> {
    return this.queueRepository.consume(topic, domain, handler, options);
  }

  public uncompressMessage<T>(message: string): T {
    return this.queueRepository.uncompressMessage<T>(message);
  }
}
