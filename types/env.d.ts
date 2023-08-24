/// <reference types="vite-svg-loader" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NOOD_UI_URL: string;
  readonly NOOD_API_URL: string;
  readonly NOOD_AUTH_AUTHORITY_URL: string;
  readonly NOOD_AUTH_CLIENT_ID: string;
  readonly NOOD_AUTH_CLIENT_SCOPES: string;
  readonly NOOD_AUTH_REDIRECT_URI: string;
  readonly NOOD_AUTH_POST_LOGOUT_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
