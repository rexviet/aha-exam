import { AuthRepositoryImpl } from '@modules/auth/auth.repo';
import { CreateUserService } from '@modules/user/use-cases/create-user/create-user.service';
import { UserRepositoryImpl } from '@modules/user/user.repo';
import { Provider } from '@nestjs/common';
import { SignUpService } from './signup.service';

export const SignUpSymbol = Symbol('SignUpSymbol');

export const SignUpProvider: Provider = {
  provide: SignUpSymbol,
  useFactory: (
    repo: AuthRepositoryImpl,
    userRepo: UserRepositoryImpl,
  ): SignUpService => {
    const createUserService = new CreateUserService(userRepo);
    return new SignUpService(repo, createUserService);
  },
  inject: [AuthRepositoryImpl, UserRepositoryImpl],
};
