import type { UserSettings } from './UserSettings.d';

export const getDefaultUserSettings = (userId: string): UserSettings => ({
  id: userId,
  firstName: '',
  lastName: '',
  profileImageUrl: '',
});

export * from './UserSettings.d';
export * from './repository';
