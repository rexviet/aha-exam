export interface IUserModel {
  readonly provider: string;
  readonly uid: string;
  readonly email?: string;
  readonly emailVerified: boolean;
  readonly displayName?: string;
  readonly photoURL?: string;
  readonly no_times_logged_in?: number;
  readonly last_session_timestamp?: number;
}
