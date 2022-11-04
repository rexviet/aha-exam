import { AuthRepositoryImpl } from '@modules/auth/auth.repo';
import { GetUserByUidService } from '@modules/user/use-cases/get-user-by-uid/get-user-by-uid.service';
import { UserRepositoryImpl } from '@modules/user/user.repo';
import { Provider } from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';

export const ChangePasswordSymbol = Symbol('ChangePasswordSymbol');

export const ChangePasswordProvider: Provider = {
  provide: ChangePasswordSymbol,
  useFactory: (
    repo: AuthRepositoryImpl,
    userRepo: UserRepositoryImpl,
  ): ChangePasswordService => {
    const getUserByUidService = new GetUserByUidService(userRepo);
    return new ChangePasswordService(repo, getUserByUidService);
  },
  inject: [AuthRepositoryImpl, UserRepositoryImpl],
};
