import { ListModelRes } from '@modules/shared/domain/list-model';
import { GetListUsersParams } from '@modules/user/domain/params/get-list-users.params';
import { GetListUsersPayload } from '@modules/user/domain/payloads/get-list-users.payload';
import { IUserModel } from '@modules/user/domain/user.model';
import { IUserRepository } from '@modules/user/user.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetListUsersService {
  constructor(private readonly repository: IUserRepository) {}

  public async execute(
    params: GetListUsersParams,
  ): Promise<ListModelRes<IUserModel>> {
    const payload = new GetListUsersPayload(
      params.page || 1,
      params.pageSize || 20,
    );
    return this.repository.getListUsers(payload);
  }
}
