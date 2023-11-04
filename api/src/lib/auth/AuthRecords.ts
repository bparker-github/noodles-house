export enum PermissionType {
  VIEW_DASHBOARD = 'View Dashboard',
  VIEW_ADMIN_PANEL = 'View Admin Panel',
}
export interface Permission {
  type: PermissionType;
  description: string;
  forGroups: string[];
}

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

export enum RoleType {
  BEN = 'BEN',
  FRIEND = 'FRIEND',
  ACQUAINTANCE = 'ACQUAINTANCE',
  ANON = 'ANON',
}

export interface Role {
  type: RoleType;
  description: string;
  permissions: Permission[];
  forGroups: string[];
}

export const RoleList: Role[] = [
  {
    type: RoleType.ACQUAINTANCE,
    description: 'This user is welcome to inspect and view the site. Minimal interaction.',
    forGroups: [],
    permissions: [DashboardPerm],
  },
  {
    type: RoleType.ANON,
    description: 'This user is unknown and has no permissions. Must log in.',
    forGroups: [],
    permissions: [],
  },
  {
    type: RoleType.BEN,
    description: 'This user is Ben. Just a Ben.',
    forGroups: [],
    permissions: [AdminPerm, DashboardPerm],
  },
  {
    type: RoleType.FRIEND,
    description:
      'This user is a friend of Ben. They have elevated and permissions to interact with the ecosystem.',
    forGroups: [],
    permissions: [DashboardPerm],
  },
];
