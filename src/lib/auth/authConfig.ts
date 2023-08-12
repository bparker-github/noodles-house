import { type Configuration as PCAConfig } from '@azure/msal-browser';

function throwConfigError(configName: string): never {
  throw new Error(`Missing config value: ${configName}`);
}

export function getAuthConfig(): PCAConfig {
  const clientId = import.meta.env.VITE_MSAL_CLIENT_ID ?? throwConfigError('clientId');
  const authority = import.meta.env.VITE_MSAL_AUTHORITY ?? throwConfigError('authority');
  const redirectUri = import.meta.env.VITE_MSAL_REDIRECT_URI ?? throwConfigError('redirectUri');
  const postLogoutRedirectUri =
    import.meta.env.VITE_MSAL_POST_LOGOUT_REDIRECT_URI ?? throwConfigError('postLogoutRedirectUri');
  const otherAuthoritiesStr =
    import.meta.env.VITE_MSAL_OTHER_AUTHORITIES ?? throwConfigError('otherAuthoritiesStr');
  const knownAuthorities = otherAuthoritiesStr.split(',');

  return {
    auth: {
      clientId,
      authority,
      knownAuthorities,
      redirectUri,
      navigateToLoginRequestUrl: false,
      postLogoutRedirectUri
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: true
    }
  };
}
