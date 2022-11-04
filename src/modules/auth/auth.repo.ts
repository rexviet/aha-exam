import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import * as serviceAccount from './service-account.json';
import * as firebase from 'firebase-admin';
import { initializeApp as initClientApp } from 'firebase/app';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { ChangePasswordPayload } from './domain/payloads/change-password.payload';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { getAuth, Auth, signInWithEmailAndPassword } from 'firebase/auth';

export interface IAuthRepository {
  createUser(email: string, password: string): Promise<UserRecord>;
  verifyToken(token: string): Promise<DecodedIdToken>;
  generateConfirmLink(email: string): Promise<string>;
  changePassword(payload: ChangePasswordPayload): Promise<void>;
  verifyPassword(email: string, password: string): Promise<boolean>;
}

@Injectable()
export class AuthRepositoryImpl implements IAuthRepository {
  private readonly firebaseParams: firebase.ServiceAccount = {
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
  };
  private firebaseApp: firebase.app.App;
  // private clientApp: FirebaseApp;
  private auth: Auth;

  constructor(private readonly configService: ConfigService) {
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(this.firebaseParams),
    });
    const clientApp = initClientApp({
      apiKey: this.configService.get<string>('FIREBASE_API_KEY'),
      authDomain: this.configService.get<string>('FIREBASE_AUTH_DOMAIN'),
      databaseURL: this.configService.get<string>('FIREBASE_DB_URL'),
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      appId: this.configService.get<string>('FIREBASE_APP_ID'),
    });
    this.auth = getAuth(clientApp);
  }

  public async createUser(
    email: string,
    password: string,
  ): Promise<UserRecord> {
    return await this.firebaseApp.auth().createUser({
      email,
      password,
    });
  }

  public async verifyToken(token: string): Promise<DecodedIdToken> {
    return this.firebaseApp.auth().verifyIdToken(token.replace('Bearer ', ''));
  }

  public async generateConfirmLink(email: string): Promise<string> {
    return this.firebaseApp.auth().generateEmailVerificationLink(email, {
      url: 'https://aha-exam-8b280.web.app/signin.html',
    });
  }

  public async changePassword(payload: ChangePasswordPayload): Promise<void> {
    await this.firebaseApp
      .auth()
      .updateUser(payload.uid, { password: payload.newPassword });
  }

  public async verifyPassword(
    email: string,
    password: string,
  ): Promise<boolean> {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return !!user;
    } catch (err) {
      console.error('verifyPassword err:', err);
      return false;
    }
  }
}
