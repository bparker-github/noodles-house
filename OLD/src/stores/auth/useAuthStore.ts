import { accountArraysAreEqual } from '@/lib/auth/arrayCompare';
import { msalInstance } from '@/lib/auth/authConfig';
import {
  EventMessageUtils,
  EventType,
  InteractionStatus,
  PublicClientApplication,
  type AccountInfo,
  type AuthenticationResult,
  type EventMessage,
  type ExternalTokenResponse,
  type LoadTokenOptions,
  type SilentRequest,
} from '@azure/msal-browser';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface ITokenCache {
  loadExternalTokens(
    request: SilentRequest,
    response: ExternalTokenResponse,
    options: LoadTokenOptions
  ): AuthenticationResult;
}
interface MyPublicClientApplication extends PublicClientApplication {
  getTokenCache(): ITokenCache;
}

export const useAuthStore = defineStore('authStore', () => {
  // Refs
  const instance = ref<MyPublicClientApplication>(msalInstance);
  const interactionStatus = ref<InteractionStatus>(InteractionStatus.Startup);
  const accounts = ref<AccountInfo[]>(msalInstance.getAllAccounts());

  // Statics
  const initPromise = instance.value.initialize();

  // Computed
  const user = computed(() => accounts.value?.[0]);
  const isAuthenticated = computed(() => accounts.value?.length > 0);

  //#region Initalization Callbacks.
  instance.value.addEventCallback((message: EventMessage) => {
    switch (message.eventType) {
      case EventType.ACCOUNT_ADDED:
      case EventType.ACCOUNT_REMOVED:
      case EventType.LOGIN_SUCCESS:
      case EventType.SSO_SILENT_SUCCESS:
      case EventType.HANDLE_REDIRECT_END:
      case EventType.LOGIN_FAILURE:
      case EventType.SSO_SILENT_FAILURE:
      case EventType.LOGOUT_END:
      case EventType.ACQUIRE_TOKEN_SUCCESS:
      case EventType.ACQUIRE_TOKEN_FAILURE: {
        const currentAccounts = instance.value.getAllAccounts();
        if (!accountArraysAreEqual(currentAccounts, accounts.value)) {
          accounts.value = currentAccounts;
          instance.value.setActiveAccount(accounts.value?.[0]);
        }
      }
    }
  });
  instance.value.addEventCallback((message: EventMessage) => {
    const status = EventMessageUtils.getInteractionStatusFromEvent(
      message,
      interactionStatus.value
    );
    if (status !== null) {
      interactionStatus.value = status;
    }
  });
  // #endregion

  // Do redirect on startup if needed.
  if (interactionStatus.value === InteractionStatus.Startup) {
    instance.value.handleRedirectPromise().catch(() => {
      // Errors should be handled by listening to the LOGIN_FAILURE event
      return;
    });
  }

  //#region Functions
  export function beginAcquireToken(
    interactionType: InteractionType,
    request: PopupRequest | RedirectRequest | SilentRequest,
    requestOverride?: PopupRequest | RedirectRequest | SilentRequest
  ) {
    const tokenInProgress = ref(false);
    const tokenResult = ref<AuthenticationResult | null>(null);
    const tokenError = ref<AuthError | null>(null);

    async function tryHandleRedirectPromise(): Promise<boolean> {
      if (
        inProgress.value === InteractionStatus.Startup ||
        inProgress.value === InteractionStatus.HandleRedirect
      ) {
        try {
          const response = await instance.value.handleRedirectPromise();
          if (response) {
            result.value = response;
            error.value = null;
            return true;
          }
        } catch (e) {
          result.value = null;
          error.value = e as AuthError;
        }
        return false;
      }
    }

    async function tryHandleSilentRedirect(): Promise<boolean> {
      try {
        const response = await instance.value.acquireTokenSilent(tokenRequest);
        result.value = response;
        error.value = null;
        return true;
      } catch (e) {
        console.debug('AquireTokenSilent:error:', e);
        return false;
      }
    }

    async function acquireToken() {
      if (tokenInProgress.value) {
        return;
      }

      // Begin work
      localInProgress.value = true;
      const tokenRequest = requestOverride ?? loginRequest;

      try {
        if (await tryHandleRedirectPromise()) {
          return true;
        }

        if (await tryHandleSilentRedirect()) {
          return true;
        }

        if (inProgress.value !== InteractionStatus.None) {
          return;
        }
      } finally {
        localInProgress.value = false;
      }

      if (!localInProgress.value) {
        try {
          const response = await instance.acquireTokenSilent(tokenRequest);
          result.value = response;
          error.value = null;
        } catch (e) {
          if (inProgress.value !== InteractionStatus.None) {
            return;
          }

          if (interactionType === InteractionType.Popup) {
            instance
              .loginPopup(tokenRequest)
              .then((response) => {
                result.value = response;
                error.value = null;
              })
              .catch((e) => {
                error.value = e;
                result.value = null;
              });
          } else if (interactionType === InteractionType.Redirect) {
            await instance.loginRedirect(tokenRequest).catch((e) => {
              error.value = e;
              result.value = null;
            });
          }
        }
        localInProgress.value = false;
      }
    }

    const stopWatcher = watch(inProgress, () => {
      if (!result.value && !error.value) {
        acquireToken();
      } else {
        stopWatcher();
      }
    });

    acquireToken();

    return {
      acquireToken,
      result,
      error,
      inProgress: localInProgress,
    };
  }
  //#endregion

  return {
    // Refs
    instance,
    interactionStatus,
    accounts,

    // Statics
    initPromise,

    // Computed
    user,
    isAuthenticated,
  };
});
