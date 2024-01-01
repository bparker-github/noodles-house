import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { IUserSettings } from '../models/UserSettings.d';

@Entity('UserSettings')
export class UserSettings implements IUserSettings {
  @PrimaryGeneratedColumn('uuid')
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
