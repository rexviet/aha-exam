import { ModuleMetadata } from '@nestjs/common';
import SQS = require('aws-sdk/clients/sqs');
import { ConsumerOptions } from 'sqs-consumer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISqSConsumerOptions extends ConsumerOptions {}
export class DefaultConsumerOptions implements ISqSConsumerOptions {
  public static pollingWaitTimeMs = 5;
}

export interface ISQSOptions {
  prefix?: string;
  service?: string;
  sns?: string;
  sqs?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  region?: string;
  apiVersion?: string;
  logger?: any;
}

export interface ISqsConnectOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<ISQSOptions> | ISQSOptions;
  inject?: any[];
}

export interface IMessage extends SQS.Types.Message {
  Body: any;
}

export abstract class BaseConsumer {
  protected abstract handler(message: IMessage): Promise<void>;
  protected async batchHandler(messages: IMessage[]): Promise<void> {
    for (let i = 0; i < messages.length; i++) {
      await this.handler(messages[i]);
    }
  }
}
