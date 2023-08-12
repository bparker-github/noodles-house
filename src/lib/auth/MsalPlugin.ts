import {
  PublicClientApplication,
  type Configuration as MsalConfiguration
} from '@azure/msal-browser';
import { provide, type App } from 'vue';
import { getAuthConfig } from './authConfig';
import { KEYS } from './consts';

export const MsalPlugin = {
  install: (_app: App, config?: MsalConfiguration) => {
    const msalConfig = config ?? getAuthConfig();
    const pca = new PublicClientApplication(msalConfig);
    provide(KEYS.clientApp, pca);
  }
};
