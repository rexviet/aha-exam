import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { IAuthRepository } from './auth.repo';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('BearerStrategySymbol') private readonly authRepo: IAuthRepository,
  ) {
    super();
  }

  async validate(
    token: string,
    done: (error: HttpException, value: boolean | string) => any,
  ) {
    try {
      return await this.authRepo.verifyToken(token);
    } catch (error) {
      return done(error as HttpException, 'The token is not valid');
    }
  }
}
