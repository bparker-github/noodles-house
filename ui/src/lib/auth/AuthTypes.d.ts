import type { AccountInfo } from '@azure/msal-browser';
import type { Role } from './authorization/Role';

export interface NoodleUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userName: string;
  roles: Role[];
}

export interface NoodleTokenClaims {
  email?: string;
  family_name?: string;
  given_name?: string;
  group?: string[];
}
export interface NoodleAccountInfo extends AccountInfo {
  idTokenClaims?: NoodleTokenClaims & AccountInfo['idTokenClaims'];
  roles?: Role[];
}
