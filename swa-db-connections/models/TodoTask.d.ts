export interface TodoTask {
  id: string;

  /** Main Details */
  title: string;
  // Omitted for now
  subTitle: string;
  description: string;

  /** Audit details */
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}
