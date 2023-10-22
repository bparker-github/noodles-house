import {
  EventMessageUtils,
  EventType,
  InteractionStatus,
  InteractionType,
  PublicClientApplication,
  type AccountInfo,
  type AuthenticationResult,
  type EventMessage,
} from '@azure/msal-browser';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { BaseLoginRequest, getMsalConfig } from './msalConfig';
import { addMsalCallback, areNoodleAccountArraysEqual } from './msalUtils';

export type IMsalStore = ReturnType<typeof useMsalStore>;
export const useMsalStore = defineStore('msalStore', () => {
  //#region VARS + HOOKS
  /********************
   ** Vars and Hooks **
   ********************/
  /** The application to make requests with. */
  const app = ref<PublicClientApplication>(new PublicClientApplication(getMsalConfig()));

  /** The MSAL status, and hook to keep in sync. */
  const currStatus = ref<InteractionStatus>(InteractionStatus.Startup);
  // Keep the status updated.
  addMsalCallback(app, (msg: EventMessage) => {
    const newStatus = EventMessageUtils.getInteractionStatusFromEvent(msg, currStatus.value);
    if (newStatus) {
      currStatus.value = newStatus;
    }
  });

  /** Add local list of all accounts. */
  const allAccounts = ref<AccountInfo[]>([]);
  /** Add hook to listen to these events to fetch and maybe update our list. */
  addMsalCallback(
    app,
    () => {
      const newAccounts = app.value.getAllAccounts();
      // Only update when we must.
      if (!areNoodleAccountArraysEqual(newAccounts, allAccounts.value)) {
        allAccounts.value = newAccounts;
      }
    },
    EventType.ACQUIRE_TOKEN_SUCCESS,
    EventType.LOGIN_SUCCESS,
    EventType.ACCOUNT_ADDED,
    EventType.ACCOUNT_REMOVED,
    EventType.SSO_SILENT_SUCCESS,
    EventType.HANDLE_REDIRECT_END,
    EventType.LOGIN_FAILURE,
    EventType.SSO_SILENT_FAILURE,
    EventType.LOGOUT_END,
    EventType.ACQUIRE_TOKEN_FAILURE
  );

  /** Add local reference to the selected account by identifier. */
  const currAccountId = ref('');
  const currAccount = computed(() =>
    !currAccountId.value
      ? undefined
      : allAccounts.value.find((acc) => acc.homeAccountId === currAccountId.value)
  );
  // Add hook to listen to these events to update selected account.
  addMsalCallback(
    app,
    (msg: EventMessage) => {
      if (!msg.payload || !('account' in msg.payload)) {
        return;
      }

      const payload = msg.payload as AuthenticationResult;
      app.value.setActiveAccount(payload.account);
      currAccountId.value = payload.account.homeAccountId;
    },
    EventType.ACQUIRE_TOKEN_SUCCESS,
    EventType.LOGIN_SUCCESS
  );

  /** Handle the initialize events to restore data from cache. */
  addMsalCallback(
    app,
    () => {
      // Init all accounts.
      if (!allAccounts.value.length) {
        allAccounts.value = app.value.getAllAccounts();
      }
      const activeAccount = app.value.getActiveAccount();
      if (activeAccount) {
        currAccountId.value = activeAccount.homeAccountId;
      } else if (allAccounts.value[0]) {
        currAccountId.value = allAccounts.value[0].homeAccountId;
      }
    },
    EventType.INITIALIZE_END
  );

  // The init promise must be awaited before app can begin.
  const initPromise = app.value.initialize();
  //#endregion

  // #region Functions
  /*******************
   *** Functions   ***
   *******************/
  function doLogin(
    type: InteractionType = InteractionType.Popup
  ): Promise<AuthenticationResult | void> {
    if (type === InteractionType.Popup) {
      return app.value.loginPopup(BaseLoginRequest);
    } else if (type === InteractionType.Redirect) {
      return app.value.loginRedirect(BaseLoginRequest);
    } else if (type === InteractionType.Silent) {
      return app.value.ssoSilent(BaseLoginRequest);
    } else {
      throw new Error('Interaction Type not supported');
    }
  }
  function doLogout(
    type: InteractionType = InteractionType.Popup
  ): Promise<AuthenticationResult | void> {
    if (type === InteractionType.Popup) {
      return app.value.logoutPopup();
    } else if (type === InteractionType.Redirect) {
      return app.value.logoutRedirect();
    } else {
      throw new Error('Interaction Type not supported');
    }
  }

  return {
    // Main Vars
    msalApp: app,
    currStatus,
    currAccount,
    initPromise,

    // Functions,
    doLogin,
    doLogout,
  };
});
