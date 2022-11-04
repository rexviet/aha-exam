import { UserRepositoryImpl } from '@modules/user/user.repo';
import { Provider } from '@nestjs/common';
import { UpdateMyProfileService } from './update-my-profile.service';

export const UpdateMyProfileSymbol = Symbol('UpdateMyProfileSymbol');

export const UpdateMyProfileProvider: Provider = {
  provide: UpdateMyProfileSymbol,
  useFactory: (repo: UserRepositoryImpl): UpdateMyProfileService => {
    return new UpdateMyProfileService(repo);
  },
  inject: [UserRepositoryImpl],
};
