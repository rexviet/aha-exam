import { CreateUserParams } from '@modules/user/domain/params/create-user.params';
import { CreateUserPayload } from '@modules/user/domain/payloads/create-user.payload';
import { IUserModel } from '@modules/user/domain/user.model';
import { IUserRepository } from '@modules/user/user.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserService {
  constructor(private readonly repository: IUserRepository) {}

  public async execute(params: CreateUserParams): Promise<IUserModel> {
    const user = await this.repository.getUserByUid(params.uid);
    if (user) {
      return user;
    }
    const payload = new CreateUserPayload(
      params.provider,
      params.uid,
      params.emailVerified,
      params.email,
      params.displayName,
      params.photoURL,
    );
    return this.repository.createUser(payload);
  }
}
