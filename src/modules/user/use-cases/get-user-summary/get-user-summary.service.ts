import { CountActiveSessionsTodayService } from '@modules/user-action/use-cases/count-active-session-today/count-active-session-today.service';
import { CountAvgSessionsInDaysRangeService } from '@modules/user-action/use-cases/count-avg-sessions-in-day-range/count-avg-sessions-in-day-range.service';
import { IUserRepository } from '@modules/user/user.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserSummaryService {
  constructor(
    private readonly repository: IUserRepository,
    private readonly countActiveSessionsTodayService: CountActiveSessionsTodayService,
    private readonly countAvgSessionsInDayRangeService: CountAvgSessionsInDaysRangeService,
  ) {}

  public async execute() {
    const [signedUpUsers, activeSessionsToday, avgSessions] = await Promise.all(
      [
        this.repository.countTotalSignedUpUsers(),
        this.countActiveSessionsTodayService.execute(),
        this.countAvgSessionsInDayRangeService.execute(7),
      ],
    );
    return { signedUpUsers, activeSessionsToday, avgSessions };
  }
}
