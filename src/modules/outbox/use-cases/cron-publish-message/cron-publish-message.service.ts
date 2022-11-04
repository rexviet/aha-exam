import { IOutboxModel } from '@modules/outbox/domain/outbox.model';
import { OutboxStatus } from '@modules/outbox/outbox.enum';
import { IOutboxRepository } from '@modules/outbox/outbox.repo';
import { IQueueMessage, QueueService } from '@modules/shared/module-queue';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CronPublishMessageService {
  constructor(
    private readonly repository: IOutboxRepository,
    private readonly queueService: QueueService,
  ) {}

  public async execute() {
    const messages = await this.repository.getOutboxMessages(
      OutboxStatus.NEW,
      100,
    );
    if (!messages || !messages.length) {
      return;
    }
    const messageIds = [];
    const promises = messages.map((message) => {
      messageIds.push(message.id);
      const queueMessage: IQueueMessage<IOutboxModel> = {
        data: message,
      };
      return this.queueService.publish(queueMessage, message.topic);
    });
    await Promise.all(promises);

    await this.repository.setMessageStatus(messageIds, OutboxStatus.PROCESSED);
  }
}
