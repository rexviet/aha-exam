import { pack, unpack } from 'jsonpack';
import { Injectable, Logger } from '@nestjs/common';
import { Consumer } from 'sqs-consumer';
import AWS from 'aws-sdk';
import { PublishInput } from 'aws-sdk/clients/sns';
import { IQueueRepository } from '../../queue.repository';
import { IQueueMessage } from '../../queue.type';
import { ISQSOptions, ISqSConsumerOptions } from './sqs.types';
import { SendMessageRequest } from 'aws-sdk/clients/sqs';

@Injectable()
export class SqsRepository implements IQueueRepository {
  private readonly sns: AWS.SNS;

  private readonly sqs: AWS.SQS;

  private readonly logger: any | Logger;

  private readonly sqsUrl: string;

  private readonly snsUrl: string;

  constructor(private options: ISQSOptions) {
    AWS.config.update({
      apiVersion: this.options.apiVersion,
      region: this.options.region,
      accessKeyId: this.options.accessKeyId,
      secretAccessKey: this.options.secretAccessKey,
    });
    this.sqs = new AWS.SQS();
    this.sns = new AWS.SNS();
    this.logger = this.options.logger;
    const prefix = this.options.prefix || 'dev';
    this.sqsUrl = `${this.options.sqs}/${prefix}`;
    this.snsUrl = `${this.options.sns}:${prefix}`;
  }

  private compressMessage(message: IQueueMessage<any>): string {
    return pack(message);
  }

  public uncompressMessage<T>(message: string): T {
    return unpack<T>(message);
  }

  public async publish(
    message: IQueueMessage<any>,
    topic: string,
  ): Promise<void> {
    const topicArn = `${this.snsUrl}-${topic}`;
    const params: PublishInput = {
      Message: this.compressMessage(message),
      TopicArn: topicArn,
    };

    this.logger.log('publish message', SqsRepository.name, params);
    await this.sns.publish(params).promise();
  }

  public async sendMessageToQueue<T>(
    message: IQueueMessage<T>,
    queueName: string,
  ): Promise<void> {
    const queueUrl = `${this.sqsUrl}-${queueName}`;
    const request: SendMessageRequest = {
      MessageBody: this.compressMessage(message),
      QueueUrl: queueUrl,
    };
    await this.sqs.sendMessage(request).promise();
  }

  public async consume(
    domain: string,
    handler: (message: any) => any,
    topic?: string,
    options?: ISqSConsumerOptions,
  ): Promise<void> {
    let queueUrl = `${this.sqsUrl}-${domain}`;
    if (topic) {
      queueUrl += `-${topic}`;
    }
    if (typeof handler !== 'function') {
      throw new Error('Callback is not a function');
    }

    try {
      const params = {
        queueUrl,
        handleMessage: handler,
        sqs: this.sqs,
        ...options,
      };

      this.logger.log('consume message', SqsRepository.name, params);

      const app = Consumer.create(params);

      app.on('error', (err) => {
        this.logger.error(err.message, SqsRepository.name, { queueUrl });
      });

      app.on('processing_error', (err) => {
        this.logger.error(err.message, SqsRepository.name, { queueUrl });
      });

      app.start();
    } catch (error) {
      this.logger.error(error.message, SqsRepository.name, { queueUrl });
      throw error;
    }
  }
}
