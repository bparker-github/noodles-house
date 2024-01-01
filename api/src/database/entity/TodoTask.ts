import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { ITodoTask } from '../models/TodoTask.d';

@Entity('TodoTask')
export class TodoTask implements ITodoTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Main Details */
  @Column('nvarchar', { length: 255, nullable: false })
  title: string;
  @Column('nvarchar', { length: 511, nullable: true })
  subTitle: string;
  @Column('nvarchar', { nullable: true })
  description: string;

  /** Audit details */
  @Column('varchar', { length: 63, nullable: false })
  createdBy: string;
  @Column('datetime', { default: () => 'GETDATE()', nullable: false })
  createdAt: Date;
  @Column('varchar', { length: 63, nullable: false })
  updatedBy: string;
  @Column('datetime', { nullable: true })
  updatedAt: Date;
}