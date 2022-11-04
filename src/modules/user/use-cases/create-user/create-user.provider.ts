import { UserRepositoryImpl } from '@modules/user/user.repo';
import { Provider } from '@nestjs/common';
import { CreateUserService } from './create-user.service';

export const CreateUserSymbol = Symbol('CreateUserSymbol');

export const CreateUserProvider: Provider = {
  provide: CreateUserSymbol,
  useFactory: (repo: UserRepositoryImpl): CreateUserService => {
    return new CreateUserService(repo);
  },
  inject: [UserRepositoryImpl],
};
