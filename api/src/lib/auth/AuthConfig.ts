export class AuthConfig {
  public clientId: string = '';
  public loginAuthority: string = '';
  public passwordAuthority: string = '';
  public knownAuthority: string = '';
  public scopes: string[] = [];

  constructor() {
    const authName = process.env.NOOD_AUTH_AUTHORITY_NAME;
    // const authName = import.meta.env.NOOD_AUTH_AUTHORITY_NAME;
    const authBase = `https://${authName}.b2clogin.com/${authName}.onmicrosoft.com/`;

    this.clientId = process.env.NOOD_AUTH_CLIENT_ID;
    this.knownAuthority = authName + '.b2clogin.com';
    this.loginAuthority = authBase + process.env.NOOD_AUTH_POLICY_SUSI;
    this.passwordAuthority = authBase + process.env.NOOD_AUTH_POLICY_RESET_PASSWORD;
    this.scopes = process.env.NOOD_AUTH_CLIENT_SCOPES.split(' ');
  }
}
