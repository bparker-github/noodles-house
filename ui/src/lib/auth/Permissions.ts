export enum PermissionType {
  VIEW_DASHBOARD = 'View Dashboard',
  VIEW_ADMIN_PANEL = 'View Admin Panel',
}

export interface Permission {
  type: PermissionType;
  description: string;
  forGroups: string[];
}

/** The expected schema back from the API. */
export type PermissionSchema = { [perm in PermissionType]: Permission };

/** The default list of all perms and descriptions. */
const DEFAULT_PERMISSION_SCHEMA: PermissionSchema = {
  [PermissionType.VIEW_ADMIN_PANEL]: {
    type: PermissionType.VIEW_ADMIN_PANEL,
    description:  'This user may view the Admin page and data related.',
    forGroups: [],
  },
  [PermissionType.VIEW_DASHBOARD]: {
    type: PermissionType.VIEW_DASHBOARD,
    description:  'This user may view the Dashboard data.',
    forGroups: [],
  },
};

export function getDefaultPermissionSchema(): PermissionSchema {
  return { ...DEFAULT_PERMISSION_SCHEMA };
}

export function getPermsFromGroup(schema: PermissionSchema, ...groups: string[]): PermissionType[] {
  const foundPerms = new Set<PermissionType>();

  // Check all given groups.
  for (const group of groups) {
    // Filter permissions to ones that match this group.
    const permsForGroups = Object.values(schema).filter((p) => p.forGroups.includes(group));
    // Add each of these roles to the set - de-duped automatically.
    permsForGroups.forEach((p) => foundPerms.add(p.type));
  }

  return Array.from(foundPerms);
}
