export class ChangePasswordPayload {
  constructor(readonly uid: string, readonly newPassword: string) {}
}
