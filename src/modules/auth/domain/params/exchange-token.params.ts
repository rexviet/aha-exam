import { UserRecord } from 'firebase-admin/lib/auth/user-record';

export class ExchangeSessionParams {
  constructor(
    readonly firebaseUser: UserRecord | any,
    readonly method: string,
    readonly path: string,
  ) {}
}
