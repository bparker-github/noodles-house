export interface NativeUser {
  clientPrincipal: NativeUserClientPrincipal;
}

export enum NativeUserRole {
  ANONYMOUS = 'anonymous',
  AUTHENTICATED = 'authenticated',
}

export interface NativeUserClientPrincipal {
  /** The unique identifier for this user. @example <GUID> */
  userId: string;
  /** A list of roles assigned to this user by the identity provider. */
  userRoles: NativeUserRole[];
  /** A list of claims provided to this user by the identify provider. @example ['openid', 'offline'] */
  claims: string[];
  /** The identifier of the provider. @example 'aadb2c' */
  identityProvider: string;
  /** The personal identifier of the user. @example 'noodle' */
  userDetails: string;
}

// /** A utility function to check if the current user has this role. */
// function userHasRole(role: RoleType): boolean {
//   return !!curAccount.value?.roles?.some((r) => r.type === role);
// }
// /** A utility function to check if the current user has roles that include this permission. */
// function userHasPerm(perm: PermissionType): boolean {
//   return !!curAccount.value?.roles?.some((r) => r.permissions?.includes(perm));
// }
