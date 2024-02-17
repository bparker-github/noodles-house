import type { IUserSettings } from '@db/models/UserSettings.d';

export const getDefaultUserSettings = (userId: string): IUserSettings => ({
  id: userId,
  firstName: '',
  lastName: '',
  profileImageUrl: '',
});

export * from './repository';
