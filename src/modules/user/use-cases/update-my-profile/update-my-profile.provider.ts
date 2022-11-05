import { UserRepositoryImpl } from '@modules/user/user.repo';
import { Provider } from '@nestjs/common';
import { UpdateUserProfileService } from '../update-user-profile/update-user-profile.service';

export const UpdateMyProfileSymbol = Symbol('UpdateMyProfileSymbol');

export const UpdateMyProfileProvider: Provider = {
  provide: UpdateMyProfileSymbol,
  useFactory: (repo: UserRepositoryImpl): UpdateUserProfileService => {
    return new UpdateUserProfileService(repo);
  },
  inject: [UserRepositoryImpl],
};
