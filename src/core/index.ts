// Export all used code here, to allow importing from '@/core'

/************
 *  Assets  *
 ************/
import { ApiClient } from './api/ApiClient';
export const apiClient = new ApiClient();

/************
 *  Assets  *
 ************/
export { default as NoodleIcon } from './assets/NoodleIcon.svg';
export { default as NoodleIconFlat } from './assets/NoodleIconFlat.svg';

/************
 *   Auth   *
 ************/
export { AuthConfig, BaseLoginRequest, MsalInstance } from './auth/AuthConfig';
export { AuthGuardRedirect } from './auth/AuthGuardRedirect';
export { useAuthStore } from './auth/AuthStore';
export { areNoodleAccountArraysEqual } from './auth/AuthUtils';
export type { NoodleAccountInfo, NoodleTokenClaims } from './auth/AuthUtils';
export { CustomNavigationClient } from './auth/NavigationGuard';

/***************
 *   Library   *
 ***************/
export { AsyncEnumObject, EnumObject } from './lib/EnumObject';
export type { IEnumObject, IEnumObjectValue } from './lib/EnumObject';
export type { RequireOnlyOne } from './lib/typescriptAugments';
export { useUnsplash } from './lib/unsplash/useUnsplash';
