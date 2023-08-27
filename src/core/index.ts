// Export all used code here, to allow importing from '@/core'

/************
 *  Assets  *
 ************/
export { default as NoodleIcon } from './assets/NoodleIcon.svg';
export { default as NoodleIconFlat } from './assets/NoodleIconFlat.svg';

/************
 *   Auth   *
 ************/
export { AuthConfig, BaseLoginRequest, MsalInstance } from './auth/AuthConfig';
export { useAuthStore } from './auth/AuthStore';
export { areNoodleAccountArraysEqual } from './auth/AuthUtils';
export type { NoodleAccountInfo, NoodleTokenClaims } from './auth/AuthUtils';
export { CustomNavigationClient } from './auth/NavigationGuard';

/******************
 *   Components   *
 ******************/
export { default as LoadingSpinner } from './components/LoadingSpinner.vue';
export { default as MobileSidebar } from './components/MobileSidebar.vue';
export { default as ProfileDropdown } from './components/ProfileDropdown.vue';
export { default as StackedCTA } from './components/StackedCTA.vue';
export { default as UserProfileIcon } from './components/UserProfileIcon.vue';
export { default as UnsplashImage } from './lib/unsplash/UnsplashImage.vue';

/***************
 *   Library   *
 ***************/
export { AsyncEnumObject, EnumObject } from './lib/EnumObject';
export type { IEnumObject, IEnumObjectValue } from './lib/EnumObject';
export { useUnsplash } from './lib/unsplash/useUnsplash';
export type { RequireOnlyOne } from './lib/typescriptAugments';

/*************
 *   Pages   *
 *************/
export { default as AuthenticatedRedirectPage } from './pages/AuthenticatedRedirectPage.vue';
export type { AuthenticationRedirectPageProps } from './pages/AuthenticatedRedirectPage.vue';
