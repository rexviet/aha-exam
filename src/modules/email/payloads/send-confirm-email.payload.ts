export class SendConfirmEmailPayload {
  constructor(readonly toEmail: string, readonly confirmUrl: string) {}
}
