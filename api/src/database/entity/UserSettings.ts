import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserSettings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  profileLink: string;
}
