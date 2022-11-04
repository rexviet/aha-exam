export interface Attribute {
  DataType: string;
  StringValue: string;
}

export interface MessageAttribute {
  [key: string]: Attribute;
}

export interface IProduceOptions {
  DelaySeconds?: number; // Required for FIFO queues
  MessageAttributes?: MessageAttribute;
  MessageDeduplicationId?: string; // Required for FIFO queues
  MessageGroupId?: string; // Required for FIFO queues
}

export interface IPublishOptions {
  PhoneNumber?: string;
  Subject?: string;
  MessageAttributes?: MessageAttribute;
}

export interface IQueueMessage<T> {
  readonly data: T;
  readonly additionalInfo?: any;
}
export class QueueMessage<T> implements IQueueMessage<T> {
  constructor(readonly data: T, readonly additionalInfo?: any) {}
}

export interface IConsumerOptions {
  readonly batchSize?: number;
  readonly dbSchema?: string;
}

export interface IPublishOptions {
  readonly dbSchema?: string;
}
