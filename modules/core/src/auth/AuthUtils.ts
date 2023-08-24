import type { AccountInfo } from '@azure/msal-browser';

export interface NoodleTokenClaims {
  email?: string;
}
export interface NoodleAccountInfo extends AccountInfo {
  idTokenClaims?: NoodleTokenClaims & AccountInfo['idTokenClaims'];
}

export function areNoodleAccountArraysEqual(
  arrayA: NoodleAccountInfo[],
  arrayB: NoodleAccountInfo[]
): boolean {
  if (arrayA.length !== arrayB.length) {
    return false;
  }

  const compArray = [...arrayB];

  return arrayA.every((eA) => {
    const eB = compArray.shift();
    if (!eA || !eB) {
      return false;
    }

    return (
      eA.homeAccountId === eB.homeAccountId &&
      eA.localAccountId === eB.localAccountId &&
      eA.username === eB.username
    );
  });
}
