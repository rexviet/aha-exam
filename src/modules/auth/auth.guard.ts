import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { VerifyTokenSymbol } from './use-cases/verify-token/verify-token.provider';
import { VerifyTokenService } from './use-cases/verify-token/verify-token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(VerifyTokenSymbol)
    private readonly verifyTokenService: VerifyTokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const token = req.headers.authorization;

    if (!token) {
      return true;
    }

    const decoded = await this.verifyTokenService.execute(token);
    const user = { uid: decoded.user_id, email: decoded.email };
    req.user = user;
    return true;
  }
}
