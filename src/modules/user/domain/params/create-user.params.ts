export class CreateUserParams {
  constructor(
    readonly uid: string,
    readonly emailVerified?: boolean,
    readonly email?: string,
    readonly displayName?: string,
    readonly photoURL?: string,
  ) {}
}
