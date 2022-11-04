import { IAuthRepository } from '@modules/auth/auth.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateConfirmLinkService {
  constructor(private readonly repository: IAuthRepository) {}

  public async execute(email: string): Promise<string> {
    return this.repository.generateConfirmLink(email);
  }
}
