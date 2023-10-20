import type { PermissionType } from 'common/auth/authorization/Permissions';
import type { RoleType } from 'common/auth/authorization/Role';
import 'vue-router';

export {};

declare module 'vue-router' {
  /** Extend the 'meta' property within this type. */
  interface RouteMeta {
    /** An optional list of Roles with which the user must be assigned every. */
    mustHaveAllRoles?: RoleType[];
    /** An optional list of Roles with which the user must be assigned at least one. */
    mustHaveSomeRoles?: RoleType[];

    /** An optional list of Permissions with which the user must be assigned every. */
    mustHaveAllPermissions?: PermissionType[];
    /** An optional list of Permissions with which the user must be assigned at least one. */
    mustHaveSomePermissions?: PermissionType[];

    /** An optional value indicating the location to redirect if authorization fails. @default /failed */
    failedRedirect?: RouteLocationRaw;
  }
}
