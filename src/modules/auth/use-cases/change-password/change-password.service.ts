import { AppError } from '@configs/common/app-error';
import { ERROR_CODE } from '@configs/common/codes';
import { IAuthRepository } from '@modules/auth/auth.repo';
import { ChangePasswordParams } from '@modules/auth/domain/params/change-password.params';
import { ChangePasswordPayload } from '@modules/auth/domain/payloads/change-password.payload';
import { GetUserByUidService } from '@modules/user/use-cases/get-user-by-uid/get-user-by-uid.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChangePasswordService {
  constructor(
    private readonly repository: IAuthRepository,
    private readonly getUserByUidService: GetUserByUidService,
  ) {}

  public async execute(params: ChangePasswordParams): Promise<void> {
    if (params.newPassword !== params.confirmNewPassword) {
      throw new AppError(ERROR_CODE.PASSWORD_NOT_MATCH);
    }

    const user = await this.getUserByUidService.execute(params.uid);
    if (!user) {
      throw new AppError(ERROR_CODE.USER_NOT_EXISTS);
    }

    if (user.provider === 'password') {
      const verified = await this.repository.verifyPassword(
        user.email,
        params.currentPassword,
      );
      if (!verified) {
        throw new AppError(ERROR_CODE.INVALID_PASSWORD);
      }
    }

    const payload = new ChangePasswordPayload(user.uid, params.newPassword);
    return this.repository.changePassword(payload);
  }
}
