import {
  EventMessageUtils,
  EventType,
  InteractionStatus,
  PublicClientApplication,
  type AccountInfo,
  type EventMessage,
} from '@azure/msal-browser';
import { ref } from 'vue';
import type { AuthPluginOptions } from './AuthPluginOptions';
import { getLoggerOptions } from '@/lib';

export class AuthManager {
  public MSAL: PublicClientApplication;
  public initPromise: Promise<void>;
  public currentStatus = ref<InteractionStatus>(InteractionStatus.Startup);

  private _knownAccounts = ref<AccountInfo[]>([]);
  private _activeAccount = ref<AccountInfo | null>(null);

  public getLoginRequest(authority: string = this.options.loginAuthority) {
    // Should be a subset of all types of login requests (redirect, popup, etc)
    return {
      scopes: this.options.scopes ?? [],
      authority,
    };
  }
  // Should be a subset of all types of login requests (redirect, popup, etc)
  public getTokenRequest(forAcc: AccountInfo, authority?: string) {
    return {
      account: forAcc,
      ...this.getLoginRequest(authority),
    };
  }

  constructor(public options: AuthPluginOptions) {
    this.MSAL = new PublicClientApplication({
      auth: options.getAuthOptions(),
      system: { loggerOptions: getLoggerOptions() },
    });

    // Set up lifecycle hook to monitor the accounts.
    const STAGES_TO_REFRESH_ACCOUNTS: EventType[] = [
      EventType.ACQUIRE_TOKEN_SUCCESS,
      EventType.LOGIN_SUCCESS,
      EventType.ACCOUNT_ADDED,
      EventType.ACCOUNT_REMOVED,
      EventType.SSO_SILENT_SUCCESS,
      EventType.HANDLE_REDIRECT_END,
      EventType.LOGIN_FAILURE,
      EventType.SSO_SILENT_FAILURE,
      EventType.LOGOUT_END,
      EventType.ACQUIRE_TOKEN_FAILURE,
    ];
    const STAGES_TO_RETRIEVE_ACCOUNT: EventType[] = [
      EventType.ACQUIRE_TOKEN_SUCCESS,
      EventType.LOGIN_SUCCESS,
    ];
    this.MSAL.addEventCallback((msg: EventMessage) => {
      // Update current status
      const newStatus = EventMessageUtils.getInteractionStatusFromEvent(
        msg,
        this.currentStatus.value
      );
      if (newStatus != null) {
        this.currentStatus.value = newStatus;
      }

      // Update list of accounts
      if (STAGES_TO_REFRESH_ACCOUNTS.includes(msg.eventType)) {
        const foundAccounts = this.MSAL.getAllAccounts();

        // Update list of accounts if different length, or any have different IDs.
        if (
          foundAccounts.length != this._knownAccounts.value.length ||
          foundAccounts.some(
            (fa, i) =>
              fa.homeAccountId !== this._knownAccounts.value[i].homeAccountId ||
              fa.localAccountId !== this._knownAccounts.value[i].localAccountId ||
              fa.username !== this._knownAccounts.value[i].username
          )
        ) {
          this._knownAccounts.value = foundAccounts;
        }
      }

      // Update specific account
      if (
        STAGES_TO_RETRIEVE_ACCOUNT.includes(msg.eventType) &&
        !!msg.payload &&
        'account' in msg.payload &&
        !!msg.payload.account
      ) {
        this._activeAccount.value = msg.payload.account;
        this.MSAL.setActiveAccount(msg.payload.account);
      }
    });

    // Call and store initialize to be sure it's complete before action.
    this.initPromise = this.MSAL.initialize();
  }
}
