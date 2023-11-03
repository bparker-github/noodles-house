import type { BrowserAuthOptions } from '@azure/msal-browser';
import { AuthConfig } from '@noodles-house/common';

export class AuthPluginOptions extends AuthConfig {
  getAuthOptions = (): BrowserAuthOptions => ({
    clientId: this.clientId,
    authority: this.loginAuthority,
    knownAuthorities: [this.passwordAuthority, this.knownAuthority],
  });

  getBaseLoginRequest = () => ({
    // scopes: ['User.Read'],
    scopes: import.meta.env.NOOD_AUTH_CLIENT_SCOPES.split(' '),
  });
}
