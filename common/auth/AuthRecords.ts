/** Enums */
export enum PermissionType {
  VIEW_DASHBOARD = 0,
  VIEW_ADMIN_PANEL = 10,
}
export enum RoleType {
  ANON = 0,
  ACQUAINTANCE = 5,
  FRIEND = 10,
  BEN = 100,
}

/** Interfaces */
export interface Permission {
  type: PermissionType;
  description: string;
  forGroups: string[];
}
export interface Role {
  type: RoleType;
  description: string;
  permissions: Permission[];
  forGroups: string[];
}

/** Permission Data */
const AdminPerm: Permission = {
  type: PermissionType.VIEW_ADMIN_PANEL,
  description: 'This user may view the Admin page and data related.',
  forGroups: [],
};
const DashboardPerm: Permission = {
  type: PermissionType.VIEW_DASHBOARD,
  description: 'This user may view the Dashboard data.',
  forGroups: [],
};
export const PermissionList: Permission[] = [AdminPerm, DashboardPerm];

/** Role Data */
const AcquaintanceRole = {
  type: RoleType.ACQUAINTANCE,
  description: 'This user is welcome to inspect and view the site. Minimal interaction.',
  forGroups: [],
  permissions: [DashboardPerm],
};
const AnonRole = {
  type: RoleType.ANON,
  description: 'This user is unknown and has no permissions. Must log in.',
  forGroups: [],
  permissions: [],
};
const BenRole = {
  type: RoleType.BEN,
  description: 'This user is Ben. Just a Ben.',
  forGroups: [],
  permissions: [AdminPerm, DashboardPerm],
};
const FriendRole = {
  type: RoleType.FRIEND,
  description:
    'This user is a friend of Ben. They have elevated and permissions to interact with the ecosystem.',
  forGroups: [],
  permissions: [DashboardPerm],
};
export const RoleList: Role[] = [AnonRole, AcquaintanceRole, FriendRole, BenRole];
