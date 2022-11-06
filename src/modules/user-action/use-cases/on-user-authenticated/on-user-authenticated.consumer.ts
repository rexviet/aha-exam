import { IUserAuthenticatedModel } from '@modules/auth/domain/user.authenticated.model';
import {
  QueueService,
  IMessage,
  IQueueMessage,
} from '@modules/shared/module-queue';
import { Controller, Inject, Injectable, Logger } from '@nestjs/common';
import { OnUserAuthenticatedSymbol } from './on-user-authenticated.provider';
import { OnUserAuthenticatedService } from './on-user-authenticated.service';

@Controller('user-action-on-user-authenticated-consumer')
@Injectable()
export class UserActionOnUserAuthenticatedConsumer {
  private readonly domain: string;
  private readonly logger: Logger;

  constructor(
    @Inject(OnUserAuthenticatedSymbol)
    private readonly onUserCreatedService: OnUserAuthenticatedService,
    private readonly queueService: QueueService,
  ) {
    this.domain = 'user-authenticated';
    this.logger = new Logger('UserActionOnUserAuthenticatedConsumer');
  }

  onModuleInit() {
    this.onCdcUserAuthenticated();
  }

  private async onCdcUserAuthenticated() {
    this.logger.log('Handle user-authenticated event');
    await this.queueService.consume(
      this.domain,
      async (message: IMessage) => {
        const payload = this.queueService.uncompressMessage<
          IQueueMessage<IUserAuthenticatedModel>
        >(message.Body);

        try {
          await this.onUserCreatedService.execute({
            uid: payload.data.uid,
            method: payload.data.method,
            path: payload.data.path,
            timestamp: Number(payload.data.timestamp),
          });
        } catch (err) {
          console.error('onCdcUserAuthenticated err:', err);
          throw err;
        }
        this.logger.log(`consume message: ${JSON.stringify(payload)}`);
      },
      null,
      { batchSize: 10 },
    );
  }
}
