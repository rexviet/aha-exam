export class CreateUserActionPayload {
  constructor(
    readonly uid: string,
    readonly method: string,
    readonly path: string,
    readonly timestamp: number,
  ) {}
}
