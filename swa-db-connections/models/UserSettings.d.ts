export interface IUserSettings {
  /**
   * The unique identifier of this User Setting.
   * Same as userId
   */
  id: string;
  /** An optional value indicating the user's preferred first name. */
  firstName: string;
  /** An optional value indicating the user's preferred last name. */
  lastName: string;
  /** An optional value indicating the user's preferred profile image. TODO: remove */
  profileLink: string;
}
