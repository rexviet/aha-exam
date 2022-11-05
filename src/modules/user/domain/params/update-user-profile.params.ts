export class UpdateUserProfileParams {
  constructor(
    readonly uid: string,
    readonly name?: string,
    readonly last_session_timestamp?: number,
  ) {}
}
