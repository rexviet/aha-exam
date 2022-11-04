import { OutboxRepositoryImpl } from '@modules/outbox/outbox.repo';
import { QueueService } from '@modules/shared/module-queue';
import { Provider } from '@nestjs/common';
import { CronPublishMessageService } from './cron-publish-message.service';

export const CronPublishMessageSymbol = Symbol('CronPublishMessageSymbol');

export const CronPublishMessageProvider: Provider = {
  provide: CronPublishMessageSymbol,
  useFactory: (
    repo: OutboxRepositoryImpl,
    queueService: QueueService,
  ): CronPublishMessageService => {
    return new CronPublishMessageService(repo, queueService);
  },
  inject: [OutboxRepositoryImpl, QueueService],
};
