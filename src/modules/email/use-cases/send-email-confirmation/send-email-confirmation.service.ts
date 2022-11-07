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
    if (user.emailVerified) {
      return;
    }

    const email = user.email as string;
    const confirmLink = await this.generateConfirmLinkService.execute(
      email,
    );
    const payload = new SendConfirmEmailPayload(email, confirmLink);
    return this.repository.sendConfirmEmail(payload);
  }
}
