import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { SqsRepository } from './impl/sqs/sqs.repository';
import { ISqsConnectOptions, ISQSOptions } from './impl/sqs/sqs.types';
import { QUEUE_REPO_INJECT, SQS_OPTIONS } from './queue.constant';
import { QueueService } from './queue.service';

@Global()
@Module({})
export class QueueModule {
  static forRootAsync(options: ISqsConnectOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      imports: options.imports,
      providers: [
        ...asyncProviders,
        QueueService,
        {
          provide: QUEUE_REPO_INJECT,
          useFactory: (config: ISQSOptions) => new SqsRepository(config),
          inject: [SQS_OPTIONS, ...(options.inject || [])],
        },
      ],
      exports: [QueueModule, QueueService],
      module: QueueModule,
    };
  }

  private static createAsyncProviders(options: ISqsConnectOptions): Provider[] {
    return [
      {
        provide: SQS_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
    ];
  }

  // public static rabbitForRootAsync(
  //   options: IRabbitConnectionOptions,
  // ): DynamicModule {
  //   const asyncProviders = this.createAsyncRabbitProviders(options);
  //   return {
  //     imports: options.imports,
  //     providers: [
  //       ...asyncProviders,
  //       {
  //         provide: QUEUE_REPO_INJECT,
  //         useFactory: (connection: Connection) =>
  //           new RabbitRepository(connection),
  //         inject: [RABBIT_CONNECTION, ...(options.inject || [])],
  //       },
  //     ],
  //     exports: [QueueService, QueueModule],
  //     module: QueueModule,
  //   };
  // }

  // private static createAsyncRabbitProviders(
  //   options: IRabbitConnectionOptions,
  // ): Provider[] {
  //   return [
  //     {
  //       provide: RABBIT_CONNECTION,
  //       useFactory: options.useFactory || [],
  //       inject: options.inject || [],
  //     },
  //   ];
  // }
}
