/// <reference types="vite-svg-loader" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NOOD_UI_URL: string;
  readonly NOOD_API_URL: string;
  readonly NOOD_AUTH_CLIENT_ID: string;
  readonly NOOD_AUTH_CLIENT_SCOPES: string;
  readonly NOOD_AUTH_REDIRECT_URI: string;
  readonly NOOD_AUTH_POST_LOGOUT_REDIRECT_URI: string;
  readonly NOOD_UNSPLASH_ACCESS_KEY: string;
  readonly NOOD_AUTH_AUTHORITY_NAME: string;
  readonly NOOD_AUTH_POLICY_SUSI: string;
  readonly NOOD_AUTH_POLICY_RESET_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="./vue/shims-vue.d.ts" />
