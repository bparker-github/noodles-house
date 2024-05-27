import type { IUserSettings } from '@noodles-house/db';

export const getDefaultUserSettings = (userId: string): IUserSettings => ({
  id: userId,
  firstName: '',
  lastName: '',
  profileImageUrl: '',
});

export * from './repository';
