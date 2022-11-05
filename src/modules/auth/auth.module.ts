import { UserModule } from '@modules/user/user.module';
import { Global, Module } from '@nestjs/common';
import { AuthRepositoryImpl } from './auth.repo';
import { ChangePasswordController } from './use-cases/change-password/change-password.controller';
import { ChangePasswordProvider } from './use-cases/change-password/change-password.provider';
import { SignUpController } from './use-cases/signup/signup.controller';
import { SignUpProvider } from './use-cases/signup/signup.provider';
import { VerifyTokenProvider } from './use-cases/verify-token/verify-token.provider';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ExchangeSessionController } from './use-cases/exchange-token/exchange-token.controller';
import { BearerStrategy } from './bearer.strategy';
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';
import { LogoutController } from './use-cases/logout/logout.controller';
import { ExchangeTokenProvider } from './use-cases/exchange-token/exchange-token.provider';

@Global()
@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [
    SignUpController,
    ChangePasswordController,
    ExchangeSessionController,
    LogoutController,
  ],
  providers: [
    VerifyTokenProvider,
    AuthRepositoryImpl,
    ExchangeTokenProvider,
    SignUpProvider,
    ChangePasswordProvider,
    ConfigService,
    {
      provide: 'BearerStrategySymbol',
      useFactory: (repo: AuthRepositoryImpl): BearerStrategy => {
        return new BearerStrategy(repo);
      },
      inject: [AuthRepositoryImpl],
    },
    SessionSerializer,
  ],
  exports: [AuthModule, VerifyTokenProvider, AuthRepositoryImpl],
})
export class AuthModule {}
