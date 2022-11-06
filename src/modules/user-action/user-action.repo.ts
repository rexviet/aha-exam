import { Outbox } from '@modules/outbox/domain/outbox.entity';
import { User } from '@modules/user/domain/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserActionPayload } from './domain/payload/create-user-action.payload';
import { UserAction } from './domain/user-action.entity';
import { IUserActionModel } from './domain/user-action.model';

export interface IUserActionRepository {
  createUserAction(payload: CreateUserActionPayload): Promise<IUserActionModel>;
}

export class UserActionRepositoryImpl implements IUserActionRepository {
  constructor(
    @InjectRepository(UserAction)
    private readonly repository: Repository<UserAction>,
  ) {}

  public async createUserAction(
    payload: CreateUserActionPayload,
  ): Promise<IUserActionModel> {
    return this.repository.manager.transaction(async (entityManager) => {
      let userAction = new UserAction();
      userAction.uid = payload.uid;
      userAction.method = payload.method;
      userAction.path = payload.path;
      userAction.timestamp = payload.timestamp;
      userAction = await entityManager.save(userAction);

      // await entityManager
      //   .createQueryBuilder()
      //   .update(User)
      //   .set({ last_session_timestamp: userAction.timestamp })
      //   .where('uid = :uid', { uid: userAction.uid })
      //   .execute();

      await entityManager
        .createQueryBuilder()
        .insert()
        .into(Outbox)
        .values({
          aggregateId: userAction.id,
          aggregateType: 'user_actions',
          payload: JSON.parse(JSON.stringify(userAction)),
          topic: 'cdc-user-action-created',
        })
        .execute();
      return userAction;
    });
  }
}
