/// <reference path="vite/client" />

interface ImportMetaEnv {
  readonly [key: string]: never;
  readonly VITE_MSAL_CLIENT_ID: string;
  readonly VITE_MSAL_AUTHORITY: string;
  readonly VITE_MSAL_OTHER_AUTHORITIES: string;
  readonly VITE_MSAL_REDIRECT_URI: string;
  readonly VITE_MSAL_POST_LOGOUT_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
