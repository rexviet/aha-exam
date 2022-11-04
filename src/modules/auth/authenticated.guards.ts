import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('current visit:', request.session.visits);
    request.session.visits = request.session.visits
      ? request.session.visits + 1
      : 1;
    const isAuthenticated = request.isAuthenticated();
    console.log('isAuthenticated:', isAuthenticated);
    return isAuthenticated;
  }
}
