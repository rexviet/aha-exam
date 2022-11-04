import { Connection, Exchange } from 'amqp-ts';
import { ModuleMetadata } from '@nestjs/common';

export interface IBindingExchangeOptions {
  readonly exchange: Exchange;
}

export interface IRabbitConnectionOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<Connection> | Connection;
  inject?: any[];
}
