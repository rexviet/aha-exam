import { UserRepositoryImpl } from '@modules/user/user.repo';
import { Provider } from '@nestjs/common';
import { UpdateUserProfileService } from '../update-user-profile/update-user-profile.service';
import { UserOnCdcUserActionCreatedService } from './on-cdc-user-action-created.service';

export const UserOnCdcUserActionCreatedSymbol = Symbol(
  'UserOnCdcUserActionCreatedSymbol',
);

export const UserOnCdcUserActionCreatedProvider: Provider = {
  provide: UserOnCdcUserActionCreatedSymbol,
  useFactory: (repo: UserRepositoryImpl): UserOnCdcUserActionCreatedService => {
    const updateUserProfileService = new UpdateUserProfileService(repo);
    return new UserOnCdcUserActionCreatedService(updateUserProfileService);
  },
  inject: [UserRepositoryImpl],
};
