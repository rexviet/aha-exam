import { IUserAuthenticatedModel } from '@modules/auth/domain/user.authenticated.model';
import { CreateUserActionParams } from '@modules/user-action/domain/params/create-user-action.params';
import { Injectable } from '@nestjs/common';
import { CreateUserActionService } from '../create-user-action/create-user-action.service';

@Injectable()
export class OnUserAuthenticatedService {
  constructor(
    private readonly createUserActionService: CreateUserActionService,
  ) {}

  public async execute(authenticated: IUserAuthenticatedModel) {
    const params = new CreateUserActionParams(
      authenticated.uid,
      authenticated.method,
      authenticated.path,
      authenticated.timestamp,
    );
    return this.createUserActionService.execute(params);
  }
}
