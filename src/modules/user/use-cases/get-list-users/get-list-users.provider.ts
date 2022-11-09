import { UserRepositoryImpl } from '@modules/user/user.repo';
import { Provider } from '@nestjs/common';
import { GetListUsersService } from './get-list-users.service';

export const GetListUsersSymbol = Symbol('GetListUsersSymbol');

export const GetListUsersProvider: Provider = {
  provide: GetListUsersSymbol,
  useFactory: (repo: UserRepositoryImpl): GetListUsersService => {
    return new GetListUsersService(repo);
  },
  inject: [UserRepositoryImpl],
};
