export class ListModelRes<T> {
  constructor(readonly data: T[], readonly total: number) {}
}
