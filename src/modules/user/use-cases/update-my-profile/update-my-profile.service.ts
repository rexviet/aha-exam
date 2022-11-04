import { AppError } from '@configs/common/app-error';
import { ERROR_CODE } from '@configs/common/codes';
import { UpdateMyProfileParams } from '@modules/user/domain/params/update-my-profile.params';
import { UpdateMyProfilePayload } from '@modules/user/domain/payloads/update-my-profile.payload';
import { IUserRepository } from '@modules/user/user.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateMyProfileService {
  constructor(private readonly repository: IUserRepository) {}

  public async execute(params: UpdateMyProfileParams): Promise<void> {
    const user = await this.repository.getUserByUid(params.uid);
    if (!user) {
      throw new AppError(ERROR_CODE.USER_NOT_EXISTS);
    }

    const payload = new UpdateMyProfilePayload(
      user.uid,
      params.name || user.displayName,
    );
    return this.repository.updateUserProfile(payload);
  }
}
