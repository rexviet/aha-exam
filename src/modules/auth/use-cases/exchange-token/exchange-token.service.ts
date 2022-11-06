import { ExchangeSessionParams } from '@modules/auth/domain/params/exchange-token.params';
import { CreateUserActionParams } from '@modules/user-action/domain/params/create-user-action.params';
import { CreateUserActionService } from '@modules/user-action/use-cases/create-user-action/create-user-action.service';
import { CreateUserParams } from '@modules/user/domain/params/create-user.params';
import { IUserModel } from '@modules/user/domain/user.model';
import { CreateUserService } from '@modules/user/use-cases/create-user/create-user.service';
import { GetUserByUidService } from '@modules/user/use-cases/get-user-by-uid/get-user-by-uid.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeTokenService {
  constructor(
    private readonly getUserByUidService: GetUserByUidService,
    private readonly createUserActionService: CreateUserActionService,
    private readonly createUserService: CreateUserService,
  ) {}

  public async execute(params: ExchangeSessionParams): Promise<IUserModel> {
    let user = await this.getUserByUidService.execute(params.firebaseUser.uid);
    if (!user) {
      const createUserParams = new CreateUserParams(
        params.firebaseUser.uid,
        true,
        params.firebaseUser.email,
        params.firebaseUser.displayName || params.firebaseUser.name,
        params.firebaseUser.photoURL || params.firebaseUser.picture,
      );
      user = await this.createUserService.execute(createUserParams);
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
