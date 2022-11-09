import { IUserActionRepository } from '@modules/user-action/user-action.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CountAvgSessionsInDaysRangeService {
  constructor(private readonly repository: IUserActionRepository) {}

  public async execute(days: number): Promise<number> {
    return this.repository.countAvgSessionsInDaysRange(days);
  }
}
