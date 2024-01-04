import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import type { TodoTask } from '../models/TodoTask.d';
import type { TodoTask } from '../../../../swa-db-connections/models/TodoTask.d';

@Entity('TodoTask')
export class TodoTaskModel extends BaseEntity implements TodoTask {
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
