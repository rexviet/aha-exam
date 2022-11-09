import { AppError } from '@configs/common/app-error';
import { ERROR_CODE } from '@configs/common/codes';
import { IUserModel } from '@modules/user/domain/user.model';
import { IUserRepository } from '@modules/user/user.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserByUidService {
  constructor(private readonly repository: IUserRepository) {}

  public async execute(uid: string): Promise<IUserModel> {
    const user = await this.repository.getUserByUid(uid);
    if (!user) {
      throw new AppError(ERROR_CODE.USER_NOT_FOUND);
    }
    return user;
  }
}
