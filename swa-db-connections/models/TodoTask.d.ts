export interface TodoTask {
  id: string;

  /** Main Details */
  title: string;
  // Omitted for now
  subTitle?: string;
  /** The long-form description of this task. */
  description?: string;
  /** The type of task this represents. */
  type: TaskType;

  /** Audit details */
  createdBy: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

export const enum TaskType {
  UNSPECIFIED = 'Unspecified',
  BUG = 'Bug',
  IMPROVEMENT = 'Improvement',
}
