import {
  EventMessageUtils,
  EventType,
  InteractionStatus,
  InteractionType,
  PublicClientApplication,
  type AuthenticationResult,
  type EventMessage,
} from '@azure/msal-browser';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { BaseLoginRequest, MsalInstance } from './AuthConfig';
import { areNoodleAccountArraysEqual, type NoodleAccountInfo } from './AuthUtils';

export type AuthStoreShape = ReturnType<typeof useAuthStore>;

export const useAuthStore = defineStore('authStore', () => {
  // Create and initialize the client.
  const instance = ref<PublicClientApplication>(MsalInstance);
  const interactionStatus = ref<InteractionStatus>(InteractionStatus.Startup);
  const accounts = ref<NoodleAccountInfo[]>(instance.value.getAllAccounts());
  const user = ref<NoodleAccountInfo>(accounts.value?.[0] ?? null);

  // Computed
  const isAuthenticated = computed(() => accounts.value.length > 0 && !!user.value);

  // Register hook to update interaction status.
  instance.value.addEventCallback((msg: EventMessage) => {
    const status = EventMessageUtils.getInteractionStatusFromEvent(msg, interactionStatus.value);
    if (status !== null) {
      interactionStatus.value = status;
    }
  });

  // Register hook to update accounts.
  instance.value.addEventCallback((msg: EventMessage) => {
    function doHandle() {
      const newAccounts = instance.value.getAllAccounts();
      if (!areNoodleAccountArraysEqual(newAccounts, accounts.value)) {
        accounts.value = newAccounts;
      }
    }
    switch (msg.eventType) {
      // @ts-expect-error
      case EventType.LOGIN_SUCCESS:
        if (msg.payload) {
          const payload = msg.payload as AuthenticationResult;
          const loggedInAccount = payload.account;
          instance.value.setActiveAccount(loggedInAccount);
        }
      // Correctly fall through and continue the handle.
      case EventType.ACCOUNT_ADDED:
      case EventType.ACCOUNT_REMOVED:
      case EventType.SSO_SILENT_SUCCESS:
      case EventType.HANDLE_REDIRECT_END:
      case EventType.LOGIN_FAILURE:
      case EventType.SSO_SILENT_FAILURE:
      case EventType.LOGOUT_END:
      case EventType.ACQUIRE_TOKEN_SUCCESS:
      case EventType.ACQUIRE_TOKEN_FAILURE:
        doHandle();
    }
  });

  function doLogin(
    type: InteractionType = InteractionType.Popup
  ): Promise<AuthenticationResult | void> {
    if (type === InteractionType.Popup) {
      return instance.value.loginPopup(BaseLoginRequest);
    } else if (type === InteractionType.Redirect) {
      return instance.value.loginRedirect(BaseLoginRequest);
    } else if (type === InteractionType.Silent) {
      return instance.value.ssoSilent(BaseLoginRequest);
    } else {
      throw new Error('Interaction Type not supported');
    }
  }
  function doLogout(
    type: InteractionType = InteractionType.Popup
  ): Promise<AuthenticationResult | void> {
    if (type === InteractionType.Popup) {
      return instance.value.logoutPopup();
    } else if (type === InteractionType.Redirect) {
      return instance.value.logoutRedirect();
    } else {
      throw new Error('Interaction Type not supported');
    }
  }

  async function getToken(): Promise<string> {
    const resp = await instance.value.acquireTokenSilent(BaseLoginRequest);
    console.log('Resp:', resp);

    return resp.accessToken;
  }

  return {
    // Variables + computed
    instance,
    interactionStatus,
    accounts,
    user,
    isAuthenticated,

    // Functions
    doLogin,
    doLogout,
    getToken,
  };
});
