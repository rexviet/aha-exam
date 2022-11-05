import { IUserRepository } from '@modules/user/user.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IncreaseNoLoggedInService {
  constructor(private readonly repository: IUserRepository) {}

  public async execute(uid: string): Promise<void> {
    return this.repository.incNoTimesLoggedIn(uid);
  }
}
