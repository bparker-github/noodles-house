import { StorageLike, UseStorageOptions } from '@vueuse/core';
import { TimedStorageVal } from '.';

/**
 * The options to pass to the UseTimedStorage function.
 *  Expand the native version with timed interface.
 */
export interface UseTimedStorageOptions<T> {
  /** The value to use as the storage key. Always prefixed with `[nh]` */
  keyName: string;
  /** The optional value to use as the initial value. @default null */
  initialValue?: T | null;
  /** The time this storage value is allowed to be accessed. @default '5m' */
  liveTime?: number;
  /** The base storage interface to use for this hook. @default SessionStorage */
  storage?: StorageLike;
  /** The optional extension value to configure the useStorage native behavior. */
  storageOptions?: UseStorageOptions<TimedStorageVal<T> | null>;
}
