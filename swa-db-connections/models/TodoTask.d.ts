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
  /** The current state of this task. */
  state: TaskState;

  /** Audit details */
  createdBy: string;
  createdAt: Date;
  updatedBy?: string;
  updatedAt?: Date;
}

export const enum TaskState {
  REPORTED = 'Reported',
  PONDERING = 'Pondering',
  IN_PROGRESS = 'In Progress',
  NOT_POSSIBLE = 'Not Possible',
  NOT_DOING = 'Not Doing',
  NOT_DOING_NOW = 'Not Doing Now',
  COMPLETED = 'Completed',
  HELD_UP = 'Held Up',
}

export const enum TaskType {
  UNSPECIFIED = 'Unspecified',
  BUG = 'Bug',
  IMPROVEMENT = 'Improvement',
}
