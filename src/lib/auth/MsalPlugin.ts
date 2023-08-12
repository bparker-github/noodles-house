import {
  PublicClientApplication,
  type Configuration as MsalConfiguration
} from '@azure/msal-browser';
import { type App } from 'vue';
import { getAuthConfig } from './authConfig';
import { KEYS } from './consts';

export const MsalPlugin = {
  install: (app: App, config?: MsalConfiguration) => {
    const msalConfig = config ?? getAuthConfig();
    const pca = new PublicClientApplication(msalConfig);
    app.provide(KEYS.clientApp, pca);
  }
};
