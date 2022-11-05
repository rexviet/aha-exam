import { ICurrentUser } from '@modules/auth/domain/current-user.model';
import { IncreaseNoLoggedInService } from '@modules/user/use-cases/increase-no-of-logged-in/increase-no-logged-in.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeTokenService {
  constructor(
    private readonly increaseNoLoggedInService: IncreaseNoLoggedInService,
  ) {}

  public async execute(user: ICurrentUser): Promise<void> {
    return this.increaseNoLoggedInService.execute(user.uid);
  }
}
