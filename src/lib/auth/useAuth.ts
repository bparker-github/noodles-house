import {
  PublicClientApplication,
  type AuthenticationResult,
  type Configuration,
  type RedirectRequest
} from '@azure/msal-browser';
import { inject } from 'vue';
import { KEYS } from './consts';
import type { RouteRecordRaw } from 'vue-router';
import type { NavigationGuard } from 'vue-router';

// const authMiddleware: Middleware = ({ app. $config }) => {
//     handleLoginRedirect(app.$msal, $config.AZURE_B2C_OAUTH_CLIENT_ID).catch(async () => {
//         await app.$msal.loginRedirect({ scopes: ['openid', 'profile'] });
//     });
// };

// export default authMiddleware

export function useAuth() {
  const app = inject<PublicClientApplication>(KEYS.clientApp)!;
  const config = inject<Configuration>(KEYS.config)!;

  if (!app) {
    throw new Error('Failed to load PublicClientApplication from MsalPlugin.');
  } else if (!config) {
    throw new Error('Failed to load AuthConfig from MsalPlugin.');
  }

  const LoginRequest = { scopes: ['User.Read'] } satisfies RedirectRequest;

  //#region Auth Functions
  async function handleLoginRedirect(app: PublicClientApplication): Promise<AuthenticationResult> {
    // Finish the redirect promise if present.
    await app.handleRedirectPromise();

    // Get accounts, validate and update active account.
    const accounts = app.getAllAccounts();
    if (!accounts.length) {
      throw new Error('No Accounts fund');
    }
    app.setActiveAccount(accounts[0]);

    // Return the resolve promise to have a token upon completion.
    return app.acquireTokenSilent(LoginRequest);
  }
  async function isMsalAuthenticated(): Promise<boolean> {
    try {
      await app.handleRedirectPromise();
    } catch {
      return false;
    }

    const allAccounts = app?.getAllAccounts() ?? [];
    return allAccounts.length > 0;
  }
  async function doRedirectLogin(): Promise<boolean> {
    try {
      await app.loginRedirect(LoginRequest);
      return true;
    } catch {
      return false;
    }
  }
  async function routeAuthGuard(to: RouteRecordRaw, authAutomatically = false): Promise<boolean> {
    if (!to.meta?.authRequired) {
      return true;
    }

    if (!(await isMsalAuthenticated())) {
      return false;
    }

    if (!authAutomatically) {
      return false;
    }

    return doRedirectLogin();
  }
  const OnBeforeEach_AutoAuth: NavigationGuard = function (to) {
    if (!to.meta?.authRequired) {
      return;
    }

    doRedirectLogin();
  };
  //#region

  return {
    app,
    config,

    loginRequest: {
      scopes: ['User.Read']
    } satisfies RedirectRequest,

    handleLoginRedirect,
    isMsalAuthenticated,
    doRedirectLogin,
    routeAuthGuard,
    OnBeforeEach_AutoAuth
  };
}
