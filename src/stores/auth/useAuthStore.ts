import { KEYS } from '@/lib/auth/consts';
import type {
  AuthenticationResult,
  Configuration,
  PublicClientApplication,
  RedirectRequest
} from '@azure/msal-browser';
import { defineStore } from 'pinia';
import { inject } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import type { NavigationGuard } from 'vue-router';

export const useAuthStore = defineStore('authStore', () => {
  // Load the provided info by the MSAl plugin.
  const app = inject<PublicClientApplication>(KEYS.clientApp)!;
  const config = inject<Configuration>(KEYS.config)!;
  if (!app) {
    throw new Error('Failed to load PublicClientApplication from MsalPlugin.');
  } else if (!config) {
    throw new Error('Failed to load AuthConfig from MsalPlugin.');
  }

  // Save some variables.
  const LoginRequest = { scopes: ['User.Read'] } satisfies RedirectRequest;

  // Functions
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
  async function isAuthenticated(): Promise<boolean> {
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

    if (!(await isAuthenticated())) {
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

  // Return the complete store, from required properties.
  return {
    app,
    config,
    LoginRequest,
    OnBeforeEach_AutoAuth,
    doRedirectLogin,
    handleLoginRedirect,
    isAuthenticated,
    routeAuthGuard
  };
});
