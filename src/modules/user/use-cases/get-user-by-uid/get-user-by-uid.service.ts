import { IUserModel } from '@modules/user/domain/user.model';
import { IUserRepository } from '@modules/user/user.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserByUidService {
  constructor(private readonly repository: IUserRepository) {}

  public async execute(uid: string): Promise<IUserModel | null> {
    return this.repository.getUserByUid(uid);
  }
}
