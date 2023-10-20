import {
  EventMessageUtils,
  EventType,
  InteractionStatus,
  InteractionType,
  NavigationClient,
  type AuthenticationResult,
  type EventMessage,
} from '@azure/msal-browser';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { BaseLoginRequest, MsalInstance } from './AuthConfig';
import { areNoodleAccountArraysEqual, type NoodleAccountInfo } from './AuthUtils';
import type { PermissionType } from './authorization/Permissions';
import { RoleType, getRolesFromGroups } from './authorization/Role';

export type AuthStoreShape = ReturnType<typeof useAuthStore>;

export const useAuthStore = defineStore('authStore', () => {
  /** The msal application to handle requests. */
  const msalPCA = ref(MsalInstance);
  /** The current state of MSAL within this app */
  const currentStatus = ref<InteractionStatus>(InteractionStatus.Startup);
  /** A list of all known accounts for this user. */
  const allAccounts = ref<NoodleAccountInfo[]>([]);
  /** An "homeAccountId" identifier of the selected account within the AllAccounts list. */
  const curAccountId = ref('');

  /** A computed getter to lookup the account from the current id. */
  const curAccount = computed<NoodleAccountInfo | undefined>(() => {
    if (!curAccount.value || !allAccounts.value.length) {
      return undefined;
    }

    const found = allAccounts.value.find((acc) => acc.homeAccountId);
    if (!found) {
      return undefined;
    }

    // Add roles and return.
    return {
      ...found,
      roles: getRolesFromGroups(...(found.idTokenClaims?.group ?? [])),
    };
  });

  //#region MSAL lifecycle and state
  /** Ensure we have an up to date reference to the status lifecycle. */
  function handleStatusUpdate(msg: EventMessage) {
    const status = EventMessageUtils.getInteractionStatusFromEvent(msg, currentStatus.value);
    if (status !== null) {
      currentStatus.value = status;
    }
  }

  /** Fetch new accounts from the PCA, and handle updating our storage values. */
  function handleUpdateAccounts() {
    const newAccounts = msalPCA.value.getAllAccounts();
    // Only update when we must.
    if (!areNoodleAccountArraysEqual(newAccounts, allAccounts.value)) {
      allAccounts.value = newAccounts;
    }
  }

  /** Handle a message payload and update our internal account list. */
  function handleAccountPayload(msg: EventMessage) {
    if (!msg.payload || !('account' in msg.payload)) {
      return;
    }

    const payload = msg.payload as AuthenticationResult;
    msalPCA.value.setActiveAccount(payload.account);
    curAccountId.value = payload.account.homeAccountId;
  }

  /** Watch the status change to map out updates for the login lifecycle. */
  function handleAccountsUpdate(msg: EventMessage) {
    switch (msg.eventType) {
      case EventType.ACQUIRE_TOKEN_SUCCESS:
      case EventType.LOGIN_SUCCESS:
        handleAccountPayload(msg);
      // We want to grab the account if we are logging in, otherwise continue to handleUpdate
      // eslint-disable-next-line no-fallthrough
      case EventType.ACCOUNT_ADDED:
      case EventType.ACCOUNT_REMOVED:
      case EventType.SSO_SILENT_SUCCESS:
      case EventType.HANDLE_REDIRECT_END:
      case EventType.LOGIN_FAILURE:
      case EventType.SSO_SILENT_FAILURE:
      case EventType.LOGOUT_END:
      case EventType.ACQUIRE_TOKEN_FAILURE:
        return handleUpdateAccounts();
    }
  }

  // Register these functions within the lifecycle
  msalPCA.value.addEventCallback((msg: EventMessage) => {
    // Keep the status updated.
    handleStatusUpdate(msg);

    // Watch the login process and update our internal accounts models.
    handleAccountsUpdate(msg);
  });
  //#endregion

  // Helper functions
  const initFunc = ref<Promise<void> | undefined>();
  async function initializeStore(client?: NavigationClient): Promise<void> {
    // Don't re-add the init function.
    if (initFunc.value) {
      return;
    }

    // Begin, but don't await the initFunc.
    initFunc.value = storeInitializer(client);
  }
  async function storeInitializer(client?: NavigationClient): Promise<void> {
    // Wrap in try/catch for supreme safety!
    try {
      // Add the navigation client, if presented.
      if (client) {
        msalPCA.value.setNavigationClient(client);
      }

      // Initialize the MSAL client itself
      await msalPCA.value.initialize();

      // Check if client has any account knowledge (from cookies, storage, etc);
      const foundAccounts = msalPCA.value.getAllAccounts();
      if (foundAccounts?.length) {
        allAccounts.value = foundAccounts;
      }

      // TODO: we can put the accountId into storage, and then try and look it up here
      // Select the first account as 'chosen'.
      const activeAcc = msalPCA.value.getActiveAccount();
      if (activeAcc) {
        curAccountId.value = activeAcc.homeAccountId;
      }
    } catch (err) {
      console.error('MSAL init error:', err);
    }
  }

  function doLogin(
    type: InteractionType = InteractionType.Popup
  ): Promise<AuthenticationResult | void> {
    if (type === InteractionType.Popup) {
      return msalPCA.value.loginPopup(BaseLoginRequest);
    } else if (type === InteractionType.Redirect) {
      return msalPCA.value.loginRedirect(BaseLoginRequest);
    } else if (type === InteractionType.Silent) {
      return msalPCA.value.ssoSilent(BaseLoginRequest);
    } else {
      throw new Error('Interaction Type not supported');
    }
  }
  function doLogout(
    type: InteractionType = InteractionType.Popup
  ): Promise<AuthenticationResult | void> {
    if (type === InteractionType.Popup) {
      return msalPCA.value.logoutPopup();
    } else if (type === InteractionType.Redirect) {
      return msalPCA.value.logoutRedirect();
    } else {
      throw new Error('Interaction Type not supported');
    }
  }

  async function getToken(): Promise<string> {
    const resp = await msalPCA.value.acquireTokenSilent(BaseLoginRequest);
    console.log('Resp:', resp);

    return resp.accessToken;
  }

  /** A utility function to check if the current user has this role. */
  function userHasRole(role: RoleType): boolean {
    return !curAccount.value ? false : !!curAccount.value.roles?.some((r) => r.type === role);
  }
  /** A utility function to check if the current user has roles that include this permission. */
  function userHasPerm(perm: PermissionType): boolean {
    return !curAccount.value
      ? false
      : !!curAccount.value.roles?.some((r) => r.permissions.includes(perm));
  }

  return {
    // Init
    initFunc,
    initializeStore,

    // Variables + computed
    msalPCA,
    currentStatus,
    allAccounts,
    curAccountId,
    curAccount,

    // Functions
    doLogin,
    doLogout,
    getToken,
    userHasRole,
    userHasPerm,
  };
});
