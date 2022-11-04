import { Injectable } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { IAuthRepository } from '../../auth.repo';

@Injectable()
export class VerifyTokenService {
  constructor(private readonly repository: IAuthRepository) {}

  public async execute(token: string): Promise<DecodedIdToken> {
    return this.repository.verifyToken(token);
  }
}
