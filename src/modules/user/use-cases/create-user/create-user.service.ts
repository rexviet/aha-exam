import { CreateUserParams } from '@modules/user/domain/params/create-user.params';
import { CreateUserPayload } from '@modules/user/domain/payloads/create-user.payload';
import { IUserModel } from '@modules/user/domain/user.model';
import { IUserRepository } from '@modules/user/user.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserService {
  constructor(private readonly repository: IUserRepository) {}

  public async execute(params: CreateUserParams): Promise<IUserModel> {
    const payload = new CreateUserPayload(
      params.uid,
      params.emailVerified,
      params.email,
      params.displayName,
      params.photoURL,
    );
    return this.repository.createUser(payload);
  }
}