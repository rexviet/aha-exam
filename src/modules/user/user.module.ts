import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { CreateUserController } from './use-cases/create-user/create-user.controller';
import { CreateUserProvider } from './use-cases/create-user/create-user.provider';
import { GetMyProfileController } from './use-cases/get-user-by-uid/get-user-by-uid.controller';
import { GetMyProfileProvider } from './use-cases/get-user-by-uid/get-user-by-uid.provider';
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
