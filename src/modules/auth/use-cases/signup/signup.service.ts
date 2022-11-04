import { Injectable } from '@nestjs/common';
import { AppError } from 'configs/common/app-error';
import { ERROR_CODE } from '@configs/common/codes';
import { SignUpParams } from '@modules/auth/domain/params/signup.params';
import { IAuthRepository } from '@modules/auth/auth.repo';

@Injectable()
export class SignUpService {
  constructor(private readonly repository: IAuthRepository) {}

  public async execute(params: SignUpParams): Promise<any> {
    if (params.password !== params.confirmPassword) {
      throw new AppError(ERROR_CODE.PASSWORD_NOT_MATCH);
    }

    const user = await this.repository.createUser(
      params.email,
      params.password,
    );

    return user;
  }
}
