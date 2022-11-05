import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IAuthRepository } from './auth.repo';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authRepo: IAuthRepository) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    return this.authRepo.verifyPassword(email, password);
  }
}
