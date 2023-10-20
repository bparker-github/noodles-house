export enum PermissionType {
  VIEW_DASHBOARD = 'View Dashboard',
  VIEW_ADMIN_PANEL = 'View Admin Panel',
}

export interface Permission {
  type: PermissionType;
  description: string;
  forGroups: string[];
}

const ALL_PERMISSIONS: Permission[] = [
  {
    type: PermissionType.VIEW_ADMIN_PANEL,
    description: 'This user may view the Admin page and data related.',
    forGroups: [],
  },
  {
    type: PermissionType.VIEW_DASHBOARD,
    description: 'This user may view the Dashboard data',
    forGroups: [],
  },
];

export function getAllPermissionTypes(): PermissionType[] {
  return ALL_PERMISSIONS.map((p) => p.type);
}
export function getAllPermissions(): Permission[] {
  return [...ALL_PERMISSIONS];
}
export function getPermissionFrom(...types: PermissionType[]): Permission[] {
  return types.map((type) => ALL_PERMISSIONS.find((p) => p.type === type)!);
}
export function getPermissionsFromGroups(...groups: string[]): PermissionType[] {
  const foundPerms = new Set<PermissionType>();

  // Check all given groups.
  for (const group of groups) {
    // Filter permissions to ones that match this group.
    const permsForGroups = ALL_PERMISSIONS.filter((p) => p.forGroups.includes(group));
    // Add each of these roles to the set - de-duped automatically.
    permsForGroups.forEach((p) => foundPerms.add(p.type));
  }

  return Array.from(foundPerms);
}
