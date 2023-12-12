import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TestModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
