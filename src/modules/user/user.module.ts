import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { CreateUserController } from './use-cases/create-user/create-user.controller';
import { CreateUserProvider } from './use-cases/create-user/create-user.provider';
import { GetMyProfileController } from './use-cases/get-user-by-uid/get-user-by-uid.controller';
import { GetMyProfileProvider } from './use-cases/get-user-by-uid/get-user-by-uid.provider';
import { UserOnCdcUserCreatedConsumer } from './use-cases/on-cdc-user-action-created/on-cdc-user-action-created.consumer';
import { UserOnCdcUserActionCreatedProvider } from './use-cases/on-cdc-user-action-created/on-cdc-user-action-created.provider';
import { UpdateMyProfileController } from './use-cases/update-my-profile/update-my-profile.controller';
import { UpdateMyProfileProvider } from './use-cases/update-my-profile/update-my-profile.provider';
import { UserRepositoryImpl } from './user.repo';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [
    CreateUserController,
    GetMyProfileController,
    UpdateMyProfileController,
  ],
  providers: [
    UserRepositoryImpl,
    CreateUserProvider,
    GetMyProfileProvider,
    UpdateMyProfileProvider,
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
