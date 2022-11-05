import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('request.session:', request.session.id);
    console.log('request.session.uid:', request.session.uid);
    // request.session.visits = request.session.visits
    //   ? request.session.visits + 1
    //   : 1;
    // const isAuthenticated = request.isAuthenticated();
    const isAuthenticated = !!request.session.uid;
    console.log('isAuthenticated:', isAuthenticated);
    return isAuthenticated;
  }
}
