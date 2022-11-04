import { IUserModel } from '@modules/user/domain/user.model';
import { Injectable } from '@nestjs/common';
import { SendEmailConfirmationService } from '../send-email-confirmation/send-email-confirmation.service';

@Injectable()
export class EmailOnCdcUserCreatedService {
  constructor(
    private readonly sendEmailConfirmService: SendEmailConfirmationService,
  ) {}

  public async execute(user: IUserModel): Promise<void> {
    console.log('user:', user);
    console.log('user.emailVerified:', user.emailVerified);
    if (user.emailVerified) {
      return;
    }

    // return this.sendEmailConfirmService.execute(user);
  }
}
