import { UserRepositoryImpl } from '@modules/user/user.repo';
import { Provider } from '@nestjs/common';
import { GetUserByUidService } from './get-user-by-uid.service';

export const GetMyProfileSymbol = Symbol('GetMyProfileSymbol');

export const GetMyProfileProvider: Provider = {
  provide: GetMyProfileSymbol,
  useFactory: (repo: UserRepositoryImpl): GetUserByUidService => {
    return new GetUserByUidService(repo);
  },
  inject: [UserRepositoryImpl],
};
