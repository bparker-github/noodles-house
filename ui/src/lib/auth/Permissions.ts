/** Enums */
export enum PermissionType {
  VIEW_DASHBOARD = 0,
  VIEW_ADMIN_PANEL = 10,
}

/** Interfaces */
export interface Permission {
  type: PermissionType;
  description: string;
  forGroups: string[];
}

/** Helpers */
export function getPermsFromGroup(allPerms: Permission[], ...groups: string[]): PermissionType[] {
  const foundPerms = new Set<PermissionType>();

  // Check all given groups.
  for (const group of groups) {
    // Filter permissions to ones that match this group.
    const permsForGroups = allPerms.filter((p) => p.forGroups.includes(group));
    // Add each of these roles to the set - de-duped automatically.
    permsForGroups.forEach((p) => foundPerms.add(p.type));
  }

  return Array.from(foundPerms);
}
