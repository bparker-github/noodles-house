/**
 * The shape of the data to be stored for a Timed Storage value.
 *  This is used to ensure non-stale data is being referenced.
 */
export interface TimedStorageVal<T> {
  storedAt: Date | string;
  value: T;
}
