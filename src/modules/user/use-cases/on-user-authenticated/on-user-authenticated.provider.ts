import { UserRepositoryImpl } from '@modules/user/user.repo';
import { Provider } from '@nestjs/common';
import { UpdateUserProfileService } from '../update-user-profile/update-user-profile.service';
import { OnUserAuthenticatedService } from './on-user-authenticated.service';

export const OnUserAuthenticatedSymbol = Symbol('OnUserAuthenticatedSymbol');

export const OnUserAuthenticatedProvider: Provider = {
  provide: OnUserAuthenticatedSymbol,
  useFactory: (repo: UserRepositoryImpl): OnUserAuthenticatedService => {
    const updateUserService = new UpdateUserProfileService(repo);
    return new OnUserAuthenticatedService(updateUserService);
  },
  inject: [UserRepositoryImpl],
};
