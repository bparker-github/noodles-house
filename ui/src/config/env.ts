export const envConfig = {
  authClientId: import.meta.env.NOOD_AUTH_CLIENT_ID,
  authAuthorityName: import.meta.env.NOOD_AUTH_AUTHORITY_NAME,
  authPolicySusi: import.meta.env.NOOD_AUTH_POLICY_SUSI,
  authPolicyResetPassword: import.meta.env.NOOD_AUTH_POLICY_RESET_PASSWORD,
  authClientScopes: import.meta.env.NOOD_AUTH_CLIENT_SCOPES,
  authRedirectUri: import.meta.env.NOOD_AUTH_REDIRECT_URI,
  authPostLogoutRedirectUri: import.meta.env.NOOD_AUTH_POST_LOGOUT_REDIRECT_URI,
  unsplashAccessKey: import.meta.env.NOOD_UNSPLASH_ACCESS_KEY,
};
export type IEnvConfig = typeof envConfig;
