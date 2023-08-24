import { LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { type Configuration as PCAConfig } from '@azure/msal-browser';

function throwConfigError(configName: string): never {
  throw new Error(`Missing config value: ${configName}`);
}

const clientId = import.meta.env.VITE_MSAL_CLIENT_ID ?? throwConfigError('clientId');
const authority = import.meta.env.VITE_MSAL_AUTHORITY ?? throwConfigError('authority');
const redirectUri = import.meta.env.VITE_MSAL_REDIRECT_URI ?? throwConfigError('redirectUri');
const postLogoutRedirectUri =
  import.meta.env.VITE_MSAL_POST_LOGOUT_REDIRECT_URI ?? throwConfigError('postLogoutRedirectUri');
const otherAuthoritiesStr =
  import.meta.env.VITE_MSAL_OTHER_AUTHORITIES ?? throwConfigError('otherAuthoritiesStr');
const knownAuthorities = otherAuthoritiesStr.split(',');

export const authConfig: PCAConfig = {
  auth: {
    clientId,
    authority,
    knownAuthorities,
    redirectUri,
    navigateToLoginRequestUrl: false,
    postLogoutRedirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
      logLevel: LogLevel.Verbose,
    },
  },
};

export const msalInstance = new PublicClientApplication(authConfig);

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ['User.Read'],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
