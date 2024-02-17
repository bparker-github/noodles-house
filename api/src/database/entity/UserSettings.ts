import type { IUserSettings } from '@db/models/UserSettings.d';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('UserSettings')
export class UserSettings implements IUserSettings {
  @PrimaryColumn({ type: 'nvarchar', length: 1024 })
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  profileLink: string;

  static Default(userId = ''): UserSettings {
    return {
      id: userId,
      firstName: '',
      lastName: '',
      profileLink: '',
    } satisfies UserSettings;
  }
}
