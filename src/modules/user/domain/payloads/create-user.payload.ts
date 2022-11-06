export class CreateUserPayload {
  constructor(
    readonly provider: string,
    readonly uid: string,
    readonly emailVerified?: boolean,
    readonly email?: string,
    readonly displayName?: string,
    readonly photoURL?: string,
  ) {}
}
