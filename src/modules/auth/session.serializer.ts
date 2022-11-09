import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error | undefined, user: any) => void): any {
    done(undefined, user);
  }
  deserializeUser(
    payload: any,
    done: (err: Error | undefined, payload: string) => void,
  ): any {
    done(undefined, payload);
  }
}
