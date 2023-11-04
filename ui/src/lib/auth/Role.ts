import type { Permission } from '.';

/** Enums */
export enum RoleType {
  ANON = 0,
  ACQUAINTANCE = 5,
  FRIEND = 10,
  BEN = 100,
}

/** Interfaces */
export interface Role {
  type: RoleType;
  description: string;
  permissions: Permission[];
  forGroups: string[];
}

/** Helpers */
export function getRolesFromGroup(allRoles: Role[], ...groups: string[]): RoleType[] {
  const foundRoles = new Set<RoleType>();

  // Check all given groups.
  for (const group of groups) {
    // Filter to roles with the group, or within a permission within the group.
    const rolesForGroup = allRoles.filter(
      (r) => r.forGroups.includes(group) || r.permissions.some((p) => p.forGroups.includes(group))
    );
    // Add each of these roles to the set - de-duped automatically.
    rolesForGroup.forEach((p) => foundRoles.add(p.type));
  }

  return Array.from(foundRoles);
}
