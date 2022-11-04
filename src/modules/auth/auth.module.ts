import { UserModule } from '@modules/user/user.module';
import { Global, Module } from '@nestjs/common';
import { AuthRepositoryImpl } from './auth.repo';
import { ChangePasswordController } from './use-cases/change-password/change-password.controller';
import { ChangePasswordProvider } from './use-cases/change-password/change-password.provider';
import { SignUpController } from './use-cases/signup/signup.controller';
import { SignUpProvider } from './use-cases/signup/signup.provider';
import { VerifyTokenProvider } from './use-cases/verify-token/verify-token.provider';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [UserModule, ConfigModule],
  controllers: [SignUpController, ChangePasswordController],
  providers: [
    VerifyTokenProvider,
    AuthRepositoryImpl,
    SignUpProvider,
    ChangePasswordProvider,
    ConfigService,
  ],
  exports: [AuthModule, VerifyTokenProvider, AuthRepositoryImpl],
})
export class AuthModule {}
