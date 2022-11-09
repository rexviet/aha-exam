import { CountActiveSessionsTodayService } from '@modules/user-action/use-cases/count-active-session-today/count-active-session-today.service';
import { CountAvgSessionsInDaysRangeService } from '@modules/user-action/use-cases/count-avg-sessions-in-day-range/count-avg-sessions-in-day-range.service';
import { UserActionRepositoryImpl } from '@modules/user-action/user-action.repo';
import { UserRepositoryImpl } from '@modules/user/user.repo';
import { Provider } from '@nestjs/common';
import { GetUserSummaryService } from './get-user-summary.service';

export const GetUserSummarySymbol = Symbol('GetUserSummarySymbol');

export const GetUserSummaryProvider: Provider = {
  provide: GetUserSummarySymbol,
  useFactory: (
    repo: UserRepositoryImpl,
    userActionRepo: UserActionRepositoryImpl,
  ): GetUserSummaryService => {
    const countActiveSessionsTodayService = new CountActiveSessionsTodayService(
      userActionRepo,
    );
    const countAvgSessionsService = new CountAvgSessionsInDaysRangeService(
      userActionRepo,
    );
    return new GetUserSummaryService(
      repo,
      countActiveSessionsTodayService,
      countAvgSessionsService,
    );
  },
  inject: [UserRepositoryImpl, UserActionRepositoryImpl],
};
