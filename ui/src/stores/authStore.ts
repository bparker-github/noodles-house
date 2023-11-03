import { useAuthPlugin } from '@/lib/auth/AuthPlugin';
import { CustomNavigationClient } from '@/lib/auth/CustomNavigationClient';
import {
  InteractionRequiredAuthError,
  InteractionType,
  type AccountInfo,
  type AuthenticationResult,
} from '@azure/msal-browser';
import {
  PermissionType,
  RoleType,
  getDefaultPermissionSchema,
  getDefaultRoleSchema,
  getRolesFromGroup,
  type NoodleAccountInfo,
} from '@noodles-house/common';
import { defineStore } from 'pinia';
import { computed, ref, toValue } from 'vue';
import type { Router } from 'vue-router';

export const useAuthStore = defineStore('auth-store', () => {
  // Retrieve the base msal info from the plugin.
  const { MSAL, options, ...authManager } = toValue(useAuthPlugin());

  // Store the schemas
  const permSchema = getDefaultPermissionSchema();
  const roleSchema = getDefaultRoleSchema(permSchema);

  // Store info separate from strict-msal.
  const accessToken = ref('');
  const _currAccountInfo = ref<AccountInfo | undefined>();
  const currAccount = computed<NoodleAccountInfo | undefined>(() =>
    !_currAccountInfo.value
      ? undefined
      : {
          ..._currAccountInfo.value,
          roles: getRolesFromGroup(
            roleSchema,
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
    const loginRequest = authManager.getLoginRequest();
    const resetRequest = authManager.getLoginRequest(options.passwordAuthority);

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

    const tokenRequest = authManager.getTokenRequest(currAccount.value);

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

  async function initialize(router: Router): Promise<void> {
    await authManager.initPromise;
    const navClient = new CustomNavigationClient(router);
    MSAL.setNavigationClient(navClient);
  }

  return {
    msalInstance: MSAL,
    msalOptions: options,
    isAuthenticated,
    currAccount,

    initialize,
    acquireToken,
    doLogin,
    doLogout,
    userHasRole,
    userHasPerm,
  };
});
