import { IUserAuthenticatedModel } from '@modules/auth/domain/user.authenticated.model';
import { UpdateUserProfileParams } from '@modules/user/domain/params/update-user-profile.params';
import { Injectable } from '@nestjs/common';
import { UpdateUserProfileService } from '../update-user-profile/update-user-profile.service';

@Injectable()
export class OnUserAuthenticatedService {
  constructor(private readonly updateUserService: UpdateUserProfileService) {}

  public async execute(authenticated: IUserAuthenticatedModel) {
    const params = new UpdateUserProfileParams(
      authenticated.uid,
      undefined,
      authenticated.timestamp,
    );
    return this.updateUserService.execute(params);
  }
}
