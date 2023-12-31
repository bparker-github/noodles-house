import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserSettings')
export class UserSettings {
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
