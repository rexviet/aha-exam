import { CreateUserActionParams } from '@modules/user-action/domain/params/create-user-action.params';
import { CreateUserActionPayload } from '@modules/user-action/domain/payload/create-user-action.payload';
import { IUserActionModel } from '@modules/user-action/domain/user-action.model';
import { IUserActionRepository } from '@modules/user-action/user-action.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserActionService {
  constructor(private readonly repository: IUserActionRepository) {}

  public async execute(
    params: CreateUserActionParams,
  ): Promise<IUserActionModel> {
    const payload = new CreateUserActionPayload(
      params.uid,
      params.method,
      params.path,
      params.timestamp || Date.now(),
    );
    return this.repository.createUserAction(payload);
  }
}
