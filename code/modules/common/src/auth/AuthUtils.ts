import type { AccountInfo } from '@azure/msal-browser';
import type { Role } from './authorization/Role';

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
export function compareNoodleAccountInfo(a?: AccountInfo | null, b?: AccountInfo | null) {
  return (
    !!a &&
    !!b &&
    a.homeAccountId === b.homeAccountId &&
    a.localAccountId === b.localAccountId &&
    a.username === b.username
  );
}
export function areNoodleAccountArraysEqual(arrayA: AccountInfo[], arrayB: AccountInfo[]): boolean {
  if (arrayA.length !== arrayB.length) {
    return false;
  }

  return arrayA.every((eA, i) => compareNoodleAccountInfo(eA, arrayB[i]));
}
