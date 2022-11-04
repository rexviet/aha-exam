import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Outbox } from './domain/outbox.entity';
import { OutboxRepositoryImpl } from './outbox.repo';
import { PublishMessageCron } from './use-cases/cron-publish-message/cron-publish-message.cron';
import { CronPublishMessageProvider } from './use-cases/cron-publish-message/cron-publish-message.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Outbox])],
  controllers: [PublishMessageCron],
  providers: [OutboxRepositoryImpl, CronPublishMessageProvider],
  exports: [OutboxModule],
})
export class OutboxModule {}
