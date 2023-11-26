export class AuthConfig {
  public clientId: string = '';
  public loginAuthority: string = '';
  public passwordAuthority: string = '';
  public knownAuthority: string = '';
  public scopes: string[] = [];

  constructor() {
    const authName = import.meta.env.NOOD_AUTH_AUTHORITY_NAME;
    this.knownAuthority = authName + '.b2clogin.com';
    const authBase = `https://${this.knownAuthority}/${authName}.onmicrosoft.com/`;

    this.clientId = import.meta.env.NOOD_AUTH_CLIENT_ID;
    this.loginAuthority = authBase + import.meta.env.NOOD_AUTH_POLICY_SUSI;
    this.passwordAuthority = authBase + import.meta.env.NOOD_AUTH_POLICY_RESET_PASSWORD;
    this.scopes = import.meta.env.NOOD_AUTH_CLIENT_SCOPES.split(' ');
  }
}
