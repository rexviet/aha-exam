import { IncreaseNoLoggedInService } from '@modules/user/use-cases/increase-no-of-logged-in/increase-no-logged-in.service';
import { UserRepositoryImpl } from '@modules/user/user.repo';
import { Provider } from '@nestjs/common';
import { ExchangeTokenService } from './exchange-token.service';

export const ExchangeTokenSymbol = Symbol('ExchangeTokenSymbol');

export const ExchangeTokenProvider: Provider = {
  provide: ExchangeTokenSymbol,
  useFactory: (userRepo: UserRepositoryImpl): ExchangeTokenService => {
    const incNoLoggedInService = new IncreaseNoLoggedInService(userRepo);
    return new ExchangeTokenService(incNoLoggedInService);
  },
  inject: [UserRepositoryImpl],
};
