export class SignUpParams {
  constructor(
    readonly email: string,
    readonly password: string,
    readonly confirmPassword: string,
  ) {}
}
