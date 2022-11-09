import { UserActionModule } from '@modules/user-action/user-action.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { CreateUserController } from './use-cases/create-user/create-user.controller';
import { CreateUserProvider } from './use-cases/create-user/create-user.provider';
import { GetListUsersController } from './use-cases/get-list-users/get-list-users.controller';
import { GetListUsersProvider } from './use-cases/get-list-users/get-list-users.provider';
import { GetMyProfileController } from './use-cases/get-user-by-uid/get-user-by-uid.controller';
import { GetMyProfileProvider } from './use-cases/get-user-by-uid/get-user-by-uid.provider';
import { GetUserSummaryController } from './use-cases/get-user-summary/get-user-summary.controller';
import { GetUserSummaryProvider } from './use-cases/get-user-summary/get-user-summary.provider';
import { UserOnCdcUserCreatedConsumer } from './use-cases/on-cdc-user-action-created/on-cdc-user-action-created.consumer';
import { UserOnCdcUserActionCreatedProvider } from './use-cases/on-cdc-user-action-created/on-cdc-user-action-created.provider';
import { UpdateMyProfileController } from './use-cases/update-my-profile/update-my-profile.controller';
import { UpdateMyProfileProvider } from './use-cases/update-my-profile/update-my-profile.provider';
import { UserRepositoryImpl } from './user.repo';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserActionModule],
  controllers: [
    CreateUserController,
    GetMyProfileController,
    UpdateMyProfileController,
    GetUserSummaryController,
    GetListUsersController,
  ],
  providers: [
    UserRepositoryImpl,
    CreateUserProvider,
    GetMyProfileProvider,
    UpdateMyProfileProvider,
    GetUserSummaryProvider,
    GetListUsersProvider,
  ],
  exports: [UserModule, UserRepositoryImpl],
})
export class UserModule {}

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserOnCdcUserCreatedConsumer],
  providers: [UserRepositoryImpl, UserOnCdcUserActionCreatedProvider],
  exports: [UserConsumerModule],
})
export class UserConsumerModule {}
