import { PermissionType } from './Permissions';

export enum RoleType {
  BEN = 'BEN',
  FRIEND = 'FRIEND',
  ACQUAINTANCE = 'ACQUAINTANCE',
  ANON = 'ANON',
}

export interface Role {
  type: RoleType;
  description: string;
  permissions: PermissionType[];
  forGroups: string[];
}

const ALL_ROLES: Role[] = [
  {
    type: RoleType.ACQUAINTANCE,
    description: 'This user is welcome to inspect and view the site. Minimal interaction.',
    forGroups: [],
    permissions: [PermissionType.VIEW_DASHBOARD],
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
    permissions: [PermissionType.VIEW_ADMIN_PANEL, PermissionType.VIEW_DASHBOARD],
  },
  {
    type: RoleType.FRIEND,
    description:
      'This user is a friend of Ben. They have elevated and permissions to interact with the ecosystem.',
    forGroups: [],
    permissions: [PermissionType.VIEW_DASHBOARD],
  },
];

export function getAllRoleTypes(): RoleType[] {
  return ALL_ROLES.map((r) => r.type);
}
export function getAllRoles(): Role[] {
  return [...ALL_ROLES];
}
export function getRolesFrom(...types: RoleType[]): Role[] {
  return types.map((type) => ALL_ROLES.find((r) => r.type === type)!);
}

export function getRolesFromGroups(...groups: string[]): Role[] {
  return ALL_ROLES.reduce((ret, cur) => {
    if (groups.some((g) => cur.forGroups.includes(g))) {
      ret.push(cur);
    }
    return ret;
  }, [] as Role[]);
}
