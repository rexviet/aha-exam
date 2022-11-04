import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailRepositoryImpl } from './email.repo';
import { EmailOnCdcUserCreatedConsumer } from './use-cases/on-cdc-user-created/on-cdc-user-created.consumer';
import { OnPackageInvoicePaidProvider } from './use-cases/on-cdc-user-created/on-cdc-user-created.provider';

@Module({
  imports: [AuthModule, ConfigModule],
  controllers: [EmailOnCdcUserCreatedConsumer],
  providers: [EmailRepositoryImpl, OnPackageInvoicePaidProvider, ConfigService],
  exports: [EmailConsumerModule],
})
export class EmailConsumerModule {}
