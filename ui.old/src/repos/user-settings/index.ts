import type { IUserSettings } from '@nh/shared';

export const getDefaultUserSettings = (userId: string): IUserSettings => ({
  id: userId,
  firstName: '',
  lastName: '',
  profileImageUrl: '',
});

export * from './repository';
