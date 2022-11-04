import { AuthRepositoryImpl } from '@modules/auth/auth.repo';
import { GenerateConfirmLinkService } from '@modules/auth/use-cases/generate-confirm-link/generate-confirm-link.service';
import { EmailRepositoryImpl } from '@modules/email/email.repo';
import { Provider } from '@nestjs/common';
import { SendEmailConfirmationService } from '../send-email-confirmation/send-email-confirmation.service';

export const EmailOnUserCreatedSymbol = Symbol('EmailOnUserCreatedSymbol');

export const OnPackageInvoicePaidProvider: Provider = {
  provide: EmailOnUserCreatedSymbol,
  useFactory: (
    emailRepo: EmailRepositoryImpl,
    authRepo: AuthRepositoryImpl,
  ): SendEmailConfirmationService => {
    const generateConfirmLinkService = new GenerateConfirmLinkService(authRepo);
    return new SendEmailConfirmationService(
      emailRepo,
      generateConfirmLinkService,
    );
  },
  inject: [EmailRepositoryImpl, AuthRepositoryImpl],
};
