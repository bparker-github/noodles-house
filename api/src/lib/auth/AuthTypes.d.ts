import type { Role } from './Role';

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
