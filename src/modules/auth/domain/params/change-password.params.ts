export class ChangePasswordParams {
  constructor(
    readonly uid: string,
    readonly currentPassword: string,
    readonly newPassword: string,
    readonly confirmNewPassword: string,
  ) {}
}
