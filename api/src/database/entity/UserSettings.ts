import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('UserSettings')
export class UserSettings {
  @PrimaryColumn('varchar', { length: 255 })
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  profileLink: string;

  static Default(userId = ''): UserSettings {
    return {
      userId,
      firstName: '',
      lastName: '',
      profileLink: '',
    } satisfies UserSettings;
  }
}
