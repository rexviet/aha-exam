import { CreateUserPayload } from './domain/payloads/create-user.payload';
import { User } from './domain/user.entity';
import { IUserModel } from './domain/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Outbox } from '@modules/outbox/domain/outbox.entity';
import { UpdateMyProfilePayload } from './domain/payloads/update-my-profile.payload';

export interface IUserRepository {
  createUser(payload: CreateUserPayload): Promise<IUserModel>;
  getUserByUid(uid: string): Promise<IUserModel>;
  updateUserProfile(payload: UpdateMyProfilePayload): Promise<void>;
}

export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public async createUser(payload: CreateUserPayload): Promise<IUserModel> {
    let user = new User();
    user.uid = payload.uid;
    user.emailVerified = payload.emailVerified;
    user.email = payload.email;
    user.displayName = payload.displayName;
    user.photoURL = payload.photoURL;
    return this.repository.manager.transaction(async (entityManager) => {
      user = await entityManager.save(user);

      await entityManager
        .createQueryBuilder()
        .insert()
        .into(Outbox)
        .values({
          aggregateId: user.id,
          aggregateType: 'users',
          payload: JSON.parse(JSON.stringify(user)),
          topic: 'cdc-user-created',
        })
        .execute();

      return user;
    });
  }

  public async getUserByUid(uid: string): Promise<IUserModel> {
    return this.repository
      .createQueryBuilder()
      .where('uid = :uid', { uid })
      .getOne();
  }

  public async updateUserProfile(
    payload: UpdateMyProfilePayload,
  ): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(User)
      .set({ displayName: payload.name })
      .where('uid = :uid', { uid: payload.uid })
      .execute();
  }
}
