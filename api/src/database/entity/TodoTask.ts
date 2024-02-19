import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskState, type TaskType, type TodoTask } from '@db/models/TodoTask.d';

@Entity('TodoTask')
export class TodoTaskModel extends BaseEntity implements TodoTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Main Details */
  @Column('nvarchar', { length: 255, nullable: false })
  title: string;
  @Column('nvarchar', { length: 255, nullable: false })
  type: TaskType;
  @Column('nvarchar', { length: 511, nullable: true })
  subTitle: string;
  @Column('nvarchar', { nullable: true })
  description: string;
  @Column('nvarchar', { length: 255, nullable: false, default: TaskState.REPORTED })
  state: TaskState;

  /** Audit details */
  @Column('varchar', { length: 63, nullable: false })
  createdBy: string;
  @Column('datetime', { default: () => 'GETDATE()', nullable: false })
  createdAt: Date;
  @Column('varchar', { length: 63, nullable: true })
  updatedBy: string;
  @Column('datetime', { nullable: true })
  updatedAt: Date;
}
