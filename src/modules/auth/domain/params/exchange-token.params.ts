import { UserRecord } from 'firebase-admin/lib/auth/user-record';

export class ExchangeSessionParams {
  constructor(
    readonly firebaseUser: any,
    readonly method: string,
    readonly path: string,
  ) {}
}
