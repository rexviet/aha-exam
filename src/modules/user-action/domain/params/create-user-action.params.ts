export class CreateUserActionParams {
  constructor(
    readonly uid: string,
    readonly method: string,
    readonly path: string,
    readonly timestamp?: number,
  ) {}
}
