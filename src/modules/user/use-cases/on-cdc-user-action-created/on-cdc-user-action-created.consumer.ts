import { IOutboxModel } from '@modules/outbox/domain/outbox.model';
import {
  QueueService,
  IMessage,
  IQueueMessage,
} from '@modules/shared/module-queue';
import { TOPIC } from '@modules/user/user.enum';
import { Controller, Inject, Injectable, Logger } from '@nestjs/common';
import { UserOnCdcUserActionCreatedSymbol } from './on-cdc-user-action-created.provider';
import { UserOnCdcUserActionCreatedService } from './on-cdc-user-action-created.service';

@Controller('user-on-cdc-user-action-created')
@Injectable()
export class UserOnCdcUserCreatedConsumer {
  private readonly domain: string;
  private readonly logger: Logger;

  constructor(
    @Inject(UserOnCdcUserActionCreatedSymbol)
    private readonly onUserActionCreatedService: UserOnCdcUserActionCreatedService,
    private readonly queueService: QueueService,
  ) {
    this.domain = 'user';
    this.logger = new Logger('UserOnCdcUserActionCreatedConsumer');
  }

  onModuleInit() {
    this.onCdcUserActionCreated();
  }

  private async onCdcUserActionCreated() {
    this.logger.log('Handle CDC_USER_ACTION_CREATED event');
    await this.queueService.consume(
      this.domain,
      async (message: IMessage) => {
        const messageBody = JSON.parse(message.Body);
        const payload = this.queueService.uncompressMessage<
          IQueueMessage<IOutboxModel>
        >(messageBody.Message);
        try {
          await this.onUserActionCreatedService.execute(payload.data.payload);
        } catch (err) {
          console.error('onCdcUserActionCreated err:', err);
          throw err;
        }
        this.logger.log(`consume message: ${JSON.stringify(payload)}`);
      },
      TOPIC.CDC_USER_ACTION_CREATED,
      { batchSize: 10 },
    );
  }
}
