import { AppError } from '@configs/common/app-error';
import { ERROR_CODE } from '@configs/common/codes';
import { ExchangeSessionParams } from '@modules/auth/domain/params/exchange-token.params';
import { CreateUserActionParams } from '@modules/user-action/domain/params/create-user-action.params';
import { CreateUserActionService } from '@modules/user-action/use-cases/create-user-action/create-user-action.service';
import { IUserModel } from '@modules/user/domain/user.model';
import { GetUserByUidService } from '@modules/user/use-cases/get-user-by-uid/get-user-by-uid.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeTokenService {
  constructor(
    private readonly getUserByUidService: GetUserByUidService,
    private readonly createUserActionService: CreateUserActionService,
  ) {}

  public async execute(params: ExchangeSessionParams): Promise<IUserModel> {
    const user = await this.getUserByUidService.execute(params.uid);
    if (!user) {
      throw new AppError(ERROR_CODE.UNAUTHORIZED);
    }

    const createUserActionParams = new CreateUserActionParams(
      user.uid,
      params.method,
      params.path,
    );
    await this.createUserActionService.execute(createUserActionParams);
    return user;
  }
}
