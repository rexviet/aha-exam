import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { IAuthRepository } from './auth.repo';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('LocalStrategySymbol') private readonly authRepo: IAuthRepository,
  ) {
    super();
    console.log('this.authRepo:', this.authRepo);
  }

  async validate(
    token: string,
    done: (error: HttpException, value: boolean | string) => any,
  ) {
    try {
      return await this.authRepo.verifyToken(token);
    } catch (error) {
      done(error, 'The token is not valid');
    }
  }
}
