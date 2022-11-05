import { Controller, Inject } from '@nestjs/common';
import { Cron, Scheduled } from 'nestjs-cron';
import { CronPublishMessageSymbol } from './cron-publish-message.provider';
import { CronPublishMessageService } from './cron-publish-message.service';

@Controller('cron-publish-message')
@Scheduled()
export class PublishMessageCron {
  constructor(
    @Inject(CronPublishMessageSymbol)
    private publishMessageService: CronPublishMessageService,
  ) {}

  @Cron('* * * * * *', { sync: true })
  async cronPublishMessage() {
    await this.publishMessageService.execute();
  }
}
