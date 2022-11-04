import { GenerateConfirmLinkService } from '@modules/auth/use-cases/generate-confirm-link/generate-confirm-link.service';
import { IEmailRepository } from '@modules/email/email.repo';
import { SendConfirmEmailPayload } from '@modules/email/payloads/send-confirm-email.payload';
import { IUserModel } from '@modules/user/domain/user.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendEmailConfirmationService {
  constructor(
    private readonly repository: IEmailRepository,
    private readonly generateConfirmLinkService: GenerateConfirmLinkService,
  ) {}

  public async execute(user: IUserModel): Promise<void> {
    console.log('SendEmailConfirmationService');
    console.log('user:', user);
    console.log('user.emailVerified:', user.emailVerified);
    if (user.emailVerified) {
      return;
    }
    console.log('XXX');
    const confirmLink = await this.generateConfirmLinkService.execute(
      user.email,
    );
    const payload = new SendConfirmEmailPayload(user.email, confirmLink);
    return this.repository.sendConfirmEmail(payload);
  }
}
