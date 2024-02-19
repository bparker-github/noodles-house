import { StorageLike, StorageSerializers, UseStorageOptions, useStorage } from '@vueuse/core';
import { differenceInMilliseconds, parseISO } from 'date-fns';
import { WritableComputedRef, computed } from 'vue';

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
  storageOptions?: UseStorageOptions<T>;
}

interface TimedStorageVal<T> {
  storedAt: Date | string;
  value: T;
}

export function useTimedStorage<T>(keyName: string): WritableComputedRef<T | null>;
export function useTimedStorage<T>(
  options: UseTimedStorageOptions<T>
): WritableComputedRef<T | null>;
export function useTimedStorage<T>(
  arg1: string | UseTimedStorageOptions<T>
): WritableComputedRef<T | null> {
  const args: UseTimedStorageOptions<T> = Object.assign(
    // Set up object to populate
    {},
    // Add in the key-name if it's the only arg.
    //  We /must/ have keyName, so provide unused default for typing.
    { keyName: typeof arg1 === 'string' ? arg1 : '' },
    // Apply the rest of the args, if passed.
    typeof arg1 === 'object' ? arg1 : {}
  );

  const {
    keyName,
    initialValue = null,
    liveTime = 5 * 60 * 1000,
    storage = sessionStorage,
    storageOptions = {},
  } = args;

  const initialObj: TimedStorageVal<T> | null =
    initialValue === null
      ? null
      : {
          storedAt: new Date(),
          value: initialValue,
        };

  const storedVal = useStorage<TimedStorageVal<T> | null>('[nh]' + keyName, initialObj, storage, {
    ...storageOptions.serializer,
    serializer: storageOptions.serializer ?? StorageSerializers.object,
  });

  return computed<T | null>({
    get: () => {
      if (!storedVal.value) {
        return null;
      }

      const storedDate =
        typeof storedVal.value.storedAt === 'string'
          ? parseISO(storedVal.value.storedAt)
          : storedVal.value.storedAt;

      if (Math.abs(differenceInMilliseconds(new Date(), storedDate)) > liveTime) {
        storedVal.value = null;
      }

      return storedVal.value?.value ?? null;
    },
    set: (nv) => (storedVal.value = nv === null ? null : { storedAt: new Date(), value: nv }),
  });
}
