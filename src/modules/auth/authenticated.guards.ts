import { IQueueMessage, QueueService } from '@modules/shared/module-queue';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { USER_AUTHENTICATED_QUEUE } from './auth.constant';
import { IUserAuthenticatedModel } from './domain/user.authenticated.model';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly queueService: QueueService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const isAuthenticated = request.isAuthenticated();
    if (isAuthenticated) {
      const qMessage: IQueueMessage<IUserAuthenticatedModel> = {
        data: {
          uid: request.user.uid,
          method: request.method,
          path: request.originalUrl.split('?')[0],
          timestamp: Date.now(),
        },
      };
      this.queueService.sendMessageToQueue(qMessage, USER_AUTHENTICATED_QUEUE);
    }

    return isAuthenticated;
  }
}
