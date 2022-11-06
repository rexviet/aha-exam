import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAction } from './domain/user-action.entity';
import { UserActionOnUserAuthenticatedConsumer } from './use-cases/on-user-authenticated/on-user-authenticated.consumer';
import { OnUserAuthenticatedProvider } from './use-cases/on-user-authenticated/on-user-authenticated.provider';
import { UserActionRepositoryImpl } from './user-action.repo';

@Module({
  imports: [TypeOrmModule.forFeature([UserAction])],
  controllers: [UserActionOnUserAuthenticatedConsumer],
  providers: [UserActionRepositoryImpl, OnUserAuthenticatedProvider],
  exports: [UserActionConsumerModule],
})
export class UserActionConsumerModule {}

@Module({
  imports: [TypeOrmModule.forFeature([UserAction])],
  controllers: [],
  providers: [UserActionRepositoryImpl],
  exports: [UserActionModule, UserActionRepositoryImpl],
})
export class UserActionModule {}
