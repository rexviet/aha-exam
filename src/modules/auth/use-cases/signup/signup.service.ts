import { Injectable } from '@nestjs/common';
import { AppError } from 'configs/common/app-error';
import { ERROR_CODE } from '@configs/common/codes';
import { SignUpParams } from '@modules/auth/domain/params/signup.params';
import { IAuthRepository } from '@modules/auth/auth.repo';
import { CreateUserService } from '@modules/user/use-cases/create-user/create-user.service';
import { CreateUserParams } from '@modules/user/domain/params/create-user.params';

@Injectable()
export class SignUpService {
  constructor(
    private readonly repository: IAuthRepository,
    private readonly createUserService: CreateUserService,
  ) {}

  public async execute(params: SignUpParams): Promise<any> {
    if (params.password !== params.confirmPassword) {
      throw new AppError(ERROR_CODE.PASSWORD_NOT_MATCH);
    }

    const { user, customToken } = await this.repository.createUser(
      params.email,
      params.password,
    );
    console.log('user:', user.toJSON());
    const createUserParams = new CreateUserParams(
      user.uid,
      user.emailVerified,
      user.email,
      user.displayName,
      user.photoURL,
    );
    const _user = await this.createUserService.execute(createUserParams);
    return { user: _user, customToken };
  }
}
