import { PermissionType, RoleType, getRolesFromGroup, type NoodleAccountInfo } from '@/lib';
import { useAuthPlugin } from '@/lib/auth/AuthPlugin';
import {
  InteractionRequiredAuthError,
  InteractionType,
  type AccountInfo,
  type AuthenticationResult,
} from '@azure/msal-browser';
import { useFetch } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { envConfig } from '../config/env';

export const useAuthStore = defineStore('auth-store', () => {
  // Retrieve the base msal info from the plugin.
  const authManager = useAuthPlugin();
  const { MSAL, options } = authManager.value;

  // Store the schemas
  const permFetch = useFetch(envConfig.apiUrl + '/getAllPermissions');

  // Store info separate from strict-msal.
  const accessToken = ref('');
  const _currAccountInfo = ref<AccountInfo | undefined>();
  const currAccount = computed<NoodleAccountInfo | undefined>(() =>
    !_currAccountInfo.value
      ? undefined
      : {
          ..._currAccountInfo.value,
          roles: getRolesFromGroup(
            [],
            ...((_currAccountInfo.value as NoodleAccountInfo).idTokenClaims?.group ?? [])
          ),
        }
  );

  const isAuthenticated = computed(() => !!currAccount.value);

  // Generate helper functions to actually be useful.
  async function makeLoginRequest(
    request: { scopes: string[]; authority?: string },
    type: InteractionType = InteractionType.Popup
  ): Promise<AuthenticationResult | void> {
    // Check redirect first, it removes us from this page sometimes.
    if (type === InteractionType.Redirect) {
      return MSAL.loginRedirect(request);
    }

    // Popup and Silent can return our new account.
    if (type !== InteractionType.None) {
      const resp = await MSAL[type === InteractionType.Popup ? 'loginPopup' : 'ssoSilent'](request);
      _currAccountInfo.value = resp.account;
      accessToken.value = resp.accessToken;
    } else {
      throw new Error('Interaction Type not supported');
    }
  }

  async function doLogin(type: InteractionType = InteractionType.Popup) {
    const loginRequest = authManager.value.getLoginRequest();
    const resetRequest = authManager.value.getLoginRequest(options.passwordAuthority);

    try {
      await makeLoginRequest(loginRequest, type);
    } catch (err) {
      if (
        !!err &&
        typeof err === 'object' &&
        'errorMessage' in err &&
        typeof err.errorMessage === 'string' &&
        err.errorMessage.indexOf('AADB2C90118') > -1
      ) {
        await makeLoginRequest(resetRequest, type);
      } else {
        throw err;
      }
    }
  }

  async function doLogout(
    type: InteractionType = InteractionType.Popup
  ): Promise<AuthenticationResult | void> {
    if (type === InteractionType.Popup) {
      return MSAL.logoutPopup();
    } else if (type === InteractionType.Redirect) {
      return MSAL.logoutRedirect();
    } else {
      throw new Error('Interaction Type not supported');
    }
  }

  async function acquireToken(): Promise<string> {
    if (accessToken.value) {
      return accessToken.value;
    }

    if (!currAccount.value) {
      console.error('Cannot get a token without user.');
      return '';
    }

    const tokenRequest = authManager.value.getTokenRequest(currAccount.value);

    try {
      const tokenResp = await MSAL.acquireTokenSilent(tokenRequest);
      return tokenResp.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        const popupResp = await MSAL.acquireTokenPopup(tokenRequest);
        return popupResp.accessToken;
      }
      return '';
    }
  }

  /** A utility function to check if the current user has this role. */
  function userHasRole(role: RoleType): boolean {
    return !!currAccount.value?.roles?.some((r) => r.type === role);
  }
  /** A utility function to check if the current user has roles that include this permission. */
  function userHasPerm(perm: PermissionType): boolean {
    return !!currAccount.value?.roles?.some((r) => r.permissions?.includes(perm));
  }

  async function initialize(): Promise<void> {
    await Promise.all([authManager.value.initPromise, permFetch.then]);
  }
  const initPromise = initialize();

  return {
    msalInstance: MSAL,
    msalOptions: options,
    isAuthenticated,
    currAccount,

    initPromise,
    acquireToken,
    doLogin,
    doLogout,
    userHasRole,
    userHasPerm,
  };
});
