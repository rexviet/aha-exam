import { CreateUserPayload } from './domain/payloads/create-user.payload';
import { User } from './domain/user.entity';
import { IUserModel } from './domain/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Outbox } from '@modules/outbox/domain/outbox.entity';
import { UpdateUserProfilePayload } from './domain/payloads/update-user-profile.payload';
import { Injectable } from '@nestjs/common';

export interface IUserRepository {
  createUser(payload: CreateUserPayload): Promise<IUserModel>;
  getUserByUid(uid: string): Promise<IUserModel | null>;
  updateUserProfile(payload: UpdateUserProfilePayload): Promise<void>;
  incNoTimesLoggedIn(uid: string): Promise<void>;
  countTotalSignedUpUsers(): Promise<number>;
}

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public async createUser(payload: CreateUserPayload): Promise<IUserModel> {
    let user = new User();
    user.provider = payload.provider;
    user.uid = payload.uid;
    user.emailVerified = payload.emailVerified || false;
    user.email = payload.email;
    user.displayName = payload.displayName;
    user.photoURL = payload.photoURL;
    user.last_session_timestamp = Date.now();
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

  public async getUserByUid(uid: string): Promise<IUserModel | null> {
    return this.repository
      .createQueryBuilder()
      .where('uid = :uid', { uid })
      .getOne();
  }

  public async updateUserProfile(
    payload: UpdateUserProfilePayload,
  ): Promise<void> {
    this.repository.manager.transaction(async (entityManager) => {
      const updateData: any = {
        displayName: payload.name,
        last_session_timestamp: payload.last_session_timestamp,
      };
      if (payload.increaseNoLoggedIn) {
        updateData.no_times_logged_in = () => 'no_times_logged_in + 1';
      }
      await entityManager
        .createQueryBuilder()
        .update(User)
        .set(updateData)
        .where('uid = :uid', { uid: payload.uid })
        .execute();
    });
  }

  public async incNoTimesLoggedIn(uid: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(User)
      .set({
        no_times_logged_in: () => 'no_times_logged_in + 1',
      })
      .where('uid = :uid', { uid })
      .execute();
  }

  public async countTotalSignedUpUsers(): Promise<number> {
    return this.repository.createQueryBuilder().getCount();
  }

}
