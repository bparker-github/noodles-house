import { Permission, PermissionSchema, PermissionType } from './Permissions';

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

/** The expected role schema from the API. */
export type RoleSchema = { [key in RoleType]: Role };

export function getDefaultRoleSchema(permSchema: PermissionSchema): RoleSchema {
  return {
    [RoleType.ACQUAINTANCE]: {
      type: RoleType.ACQUAINTANCE,
      description: 'This user is welcome to inspect and view the site. Minimal interaction.',
      forGroups: [],
      permissions:[ permSchema[PermissionType.VIEW_DASHBOARD],]
    },
    [RoleType.ANON]: {
      type: RoleType.ANON,
      description: 'This user is unknown and has no permissions. Must log in.',
      forGroups: [],
      permissions: [],
    },
    [RoleType.BEN]: {
      type: RoleType.BEN,
      description: 'This user is Ben. Just a Ben.',
      forGroups: [],
      permissions:[ permSchema[PermissionType.VIEW_ADMIN_PANEL], permSchema[PermissionType.VIEW_DASHBOARD],]
    },
    [RoleType.FRIEND]: {
      type: RoleType.FRIEND,
      description:
        'This user is a friend of Ben. They have elevated and permissions to interact with the ecosystem.',
      forGroups: [],
      permissions:[ permSchema[PermissionType.VIEW_DASHBOARD],]
    },
  };
}

export function getRolesFromGroup(schema: RoleSchema, ...groups: string[]): RoleType[] {
  const foundRoles = new Set<RoleType>();

  // Check all given groups.
  for (const group of groups) {
    // Filter to roles with the group, or within a permission within the group.
    const rolesForGroup = Object.values(schema).filter(r => r.forGroups.includes(group) || r.permissions.some(p => p.forGroups.includes(group)));
    // Add each of these roles to the set - de-duped automatically.
    rolesForGroup.forEach((p) => foundRoles.add(p.type));
  }

  return Array.from(foundRoles);
}
