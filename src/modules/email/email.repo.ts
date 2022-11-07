import Mailjet from 'node-mailjet';
import { ConfigService } from '@nestjs/config';
import { SendConfirmEmailPayload } from './payloads/send-confirm-email.payload';
import { Injectable } from '@nestjs/common';

export interface IEmailRepository {
  sendConfirmEmail(payload: SendConfirmEmailPayload): Promise<void>;
}

@Injectable()
export class EmailRepositoryImpl implements IEmailRepository {
  private readonly mailjet: Mailjet;
  private readonly systemEmail: string;

  constructor(private readonly configService: ConfigService) {
    this.mailjet = Mailjet.apiConnect(
      this.configService.get<string>('MAILJET_API_KEY') as string,
      this.configService.get<string>('MAILJET_API_SECRET') as string,
    );
    this.systemEmail = this.configService.get<string>('SYSTEM_EMAIL') as string;
  }

  public async sendConfirmEmail(
    payload: SendConfirmEmailPayload,
  ): Promise<void> {
    await this.mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: this.systemEmail,
            Name: 'The Aha - Exam Team',
          },
          To: [
            {
              Email: payload.toEmail,
              Name: 'passenger 1',
            },
          ],
          TemplateID: 4326424,
          TemplateLanguage: true,
          Subject: 'Verify your email for Aha - Exam',
          Variables: {
            confirmation_link: payload.confirmUrl,
          },
        },
      ],
    });
  }
}
