import { CreateUserActionService } from '@modules/user-action/use-cases/create-user-action/create-user-action.service';
import { UserActionRepositoryImpl } from '@modules/user-action/user-action.repo';
import { GetUserByUidService } from '@modules/user/use-cases/get-user-by-uid/get-user-by-uid.service';
import { UserRepositoryImpl } from '@modules/user/user.repo';
import { Provider } from '@nestjs/common';
import { ExchangeTokenService } from './exchange-token.service';

export const ExchangeTokenSymbol = Symbol('ExchangeTokenSymbol');

export const ExchangeTokenProvider: Provider = {
  provide: ExchangeTokenSymbol,
  useFactory: (
    userRepo: UserRepositoryImpl,
    userActionRepo: UserActionRepositoryImpl,
  ): ExchangeTokenService => {
    const getUserByUidService = new GetUserByUidService(userRepo);
    const createUserActionService = new CreateUserActionService(userActionRepo);
    return new ExchangeTokenService(
      getUserByUidService,
      createUserActionService,
    );
  },
  inject: [UserRepositoryImpl, UserActionRepositoryImpl],
};
