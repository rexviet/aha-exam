import { UserActionRepositoryImpl } from '@modules/user-action/user-action.repo';
import { Provider } from '@nestjs/common';
import { CreateUserActionService } from '../create-user-action/create-user-action.service';
import { OnUserAuthenticatedService } from './on-user-authenticated.service';

export const OnUserAuthenticatedSymbol = Symbol('OnUserAuthenticatedSymbol');

export const OnUserAuthenticatedProvider: Provider = {
  provide: OnUserAuthenticatedSymbol,
  useFactory: (repo: UserActionRepositoryImpl): OnUserAuthenticatedService => {
    const updateUserService = new CreateUserActionService(repo);
    return new OnUserAuthenticatedService(updateUserService);
  },
  inject: [UserActionRepositoryImpl],
};
