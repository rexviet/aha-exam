import { Provider } from '@nestjs/common';
import { AuthRepositoryImpl } from '../../auth.repo';
import { VerifyTokenService } from './verify-token.service';

export const VerifyTokenSymbol = Symbol('VerifyTokenSymbol');

export const VerifyTokenProvider: Provider = {
  provide: VerifyTokenSymbol,
  useFactory: (repo: AuthRepositoryImpl): VerifyTokenService => {
    return new VerifyTokenService(repo);
  },
  inject: [AuthRepositoryImpl],
};
