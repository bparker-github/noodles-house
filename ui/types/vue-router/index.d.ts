import type { NativeUserRole } from '@/auth/NativeUser';
import type { PermissionType } from '../../common/lib/auth/Permissions';
import type { RoleType } from '../../common/lib/auth/Role';
import 'vue-router';

export {};

declare module 'vue-router' {
  /** Extend the 'meta' property within this type. */
  interface RouteMeta {
    nativeUserRole?: NativeUserRole;

    /** An optional list of Roles with which the user must be assigned every. */
    requiredRoles?: RoleType | RoleType[];
    /** An optional list of Roles with which the user must be assigned at least one. */
    atLeastOneRole?: RoleType[];

    /** An optional list of Permissions with which the user must be assigned every. */
    requiredPermissions?: PermissionType | PermissionType[];
    /** An optional list of Permissions with which the user must be assigned at least one. */
    atLeastOnePermission?: PermissionType[];

    /** An optional value indicating the location to redirect if authorization fails. @default /failed */
    failedRedirect?: RouteLocationRaw;
  }
}
