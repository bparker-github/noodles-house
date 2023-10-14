import type { AccountInfo } from '@azure/msal-browser';

export interface NoodleTokenClaims {
  email?: string;
}
export interface NoodleAccountInfo extends AccountInfo {
  idTokenClaims?: NoodleTokenClaims & AccountInfo['idTokenClaims'];
}
export function compareNoodleAccountInfo(
  a?: NoodleAccountInfo | null,
  b?: NoodleAccountInfo | null
) {
  return (
    !!a &&
    !!b &&
    a.homeAccountId === b.homeAccountId &&
    a.localAccountId === b.localAccountId &&
    a.username === b.username
  );
}
export function areNoodleAccountArraysEqual(
  arrayA: NoodleAccountInfo[],
  arrayB: NoodleAccountInfo[]
): boolean {
  if (arrayA.length !== arrayB.length) {
    return false;
  }

  return arrayA.every((eA, i) => compareNoodleAccountInfo(eA, arrayB[i]));
}
