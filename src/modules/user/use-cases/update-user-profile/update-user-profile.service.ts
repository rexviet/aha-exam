import { AppError } from '@configs/common/app-error';
import { ERROR_CODE } from '@configs/common/codes';
import { UpdateUserProfileParams } from '@modules/user/domain/params/update-user-profile.params';
import { UpdateUserProfilePayload } from '@modules/user/domain/payloads/update-user-profile.payload';
import { IUserRepository } from '@modules/user/user.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserProfileService {
  constructor(private readonly repository: IUserRepository) {}

  public async execute(params: UpdateUserProfileParams): Promise<void> {
    const user = await this.repository.getUserByUid(params.uid);
    if (!user) {
      throw new AppError(ERROR_CODE.USER_NOT_EXISTS);
    }

    const payload = new UpdateUserProfilePayload(
      user.uid,
      params.name || user.displayName,
      params.last_session_timestamp || user.last_session_timestamp,
      params.increaseNoLoggedIn,
    );
    return this.repository.updateUserProfile(payload);
  }
}
