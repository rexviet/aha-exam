import { AuthRepositoryImpl } from '@modules/auth/auth.repo';
import { Provider } from '@nestjs/common';
import { SignUpService } from './signup.service';

export const SignUpSymbol = Symbol('SignUpSymbol');

export const SignUpProvider: Provider = {
  provide: SignUpSymbol,
  useFactory: (repo: AuthRepositoryImpl): SignUpService => {
    return new SignUpService(repo);
  },
  inject: [AuthRepositoryImpl],
};
