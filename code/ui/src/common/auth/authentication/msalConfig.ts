import { LogLevel, type Configuration, PublicClientApplication } from '@azure/msal-browser';

export const getMsalConfig: () => Configuration = () => {
  const baseUri = import.meta.env.NOOD_UI_URL;
  return {
    auth: {
      clientId: import.meta.env.NOOD_AUTH_CLIENT_ID,
      authority: import.meta.env.NOOD_AUTH_AUTHORITY_URL,
      knownAuthorities: [import.meta.env.NOOD_AUTH_AUTHORITY_URL],
      redirectUri: baseUri + import.meta.env.NOOD_AUTH_REDIRECT_URI,
      postLogoutRedirectUri: baseUri + import.meta.env.NOOD_AUTH_POST_LOGOUT_REDIRECT_URI,
    },
    cache: {
      cacheLocation: 'localStorage',
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
          }
        },
        logLevel: LogLevel.Verbose,
      },
    },
  };
};

export const MsalInstance = new PublicClientApplication(getMsalConfig());

export const BaseLoginRequest = {
  // scopes: ['User.Read'],
  scopes: import.meta.env.NOOD_AUTH_CLIENT_SCOPES.split(' '),
};
