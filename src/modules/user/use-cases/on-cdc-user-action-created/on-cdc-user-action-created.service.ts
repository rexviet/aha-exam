import { IUserActionModel } from '@modules/user-action/domain/user-action.model';
import { UpdateUserProfileParams } from '@modules/user/domain/params/update-user-profile.params';
import { Injectable } from '@nestjs/common';
import { UpdateUserProfileService } from '../update-user-profile/update-user-profile.service';

@Injectable()
export class UserOnCdcUserActionCreatedService {
  constructor(private readonly updateUserService: UpdateUserProfileService) {}

  public async execute(userAction: IUserActionModel): Promise<void> {
    const flagIncreateNoTineLoggedIn =
      userAction.path === '/auth/exchange-session';
    const updateUserParams = new UpdateUserProfileParams(
      userAction.uid,
      undefined,
      userAction.timestamp,
      flagIncreateNoTineLoggedIn,
    );
    return this.updateUserService.execute(updateUserParams);
  }
}
