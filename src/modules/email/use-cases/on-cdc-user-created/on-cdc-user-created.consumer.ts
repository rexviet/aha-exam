import { TOPIC } from '@modules/email/email.enum';
import { IOutboxModel } from '@modules/outbox/domain/outbox.model';
import {
  QueueService,
  IMessage,
  IQueueMessage,
} from '@modules/shared/module-queue';
import { IUserModel } from '@modules/user/domain/user.model';
import { Controller, Inject, Injectable, Logger } from '@nestjs/common';
import { EmailOnUserCreatedSymbol } from './on-cdc-user-created.provider';
import { EmailOnCdcUserCreatedService } from './on-cdc-user-created.service';

@Controller('email-on-cdc-user-created')
@Injectable()
export class EmailOnCdcUserCreatedConsumer {
  private readonly domain: string;
  private readonly logger: Logger;

  constructor(
    @Inject(EmailOnUserCreatedSymbol)
    private readonly onUserCreatedService: EmailOnCdcUserCreatedService,
    private readonly queueService: QueueService,
  ) {
    this.domain = 'email';
    this.logger = new Logger('EmailOnCdcUserCreatedConsumer');
  }

  onModuleInit() {
    this.onCdcUserCreated();
  }

  private async onCdcUserCreated() {
    this.logger.log('Handle CDC_USER_CREATED event');
    await this.queueService.consume(
      TOPIC.CDC_USER_CREATED,
      this.domain,
      async (message: IMessage) => {
        const messageBody = JSON.parse(message.Body);
        const payload = this.queueService.uncompressMessage<
          IQueueMessage<IOutboxModel>
        >(messageBody.Message);
        console.log('payload:', payload);
        try {
          await this.onUserCreatedService.execute(payload.data.payload);
        } catch (err) {
          console.error('onCdcUserCreated err:', err);
          throw err;
        }
        this.logger.log(`consume message: ${JSON.stringify(payload)}`);
      },
      { batchSize: 10 },
    );
  }
}
