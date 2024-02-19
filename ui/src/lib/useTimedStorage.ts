import { UseStorageOptions, useSessionStorage } from '@vueuse/core';
import { differenceInMilliseconds, parseISO } from 'date-fns';
import { WritableComputedRef, computed } from 'vue';

export interface UseTimedStorageOptions<T> {
  /** The value to use as the storage key. Always prefixed with `[nh]` */
  keyName: string;
  /** The optional value to use as the initial value. @default null */
  initialValue?: T | null;
  /** The time this storage value is allowed to be accessed. @default '5m' */
  liveTime?: number;
  /** The optional extension value to configure the useStorage native behavior. */
  storageOptions?: UseStorageOptions<T>;
}

interface TimedStorageVal<T> {
  storedAt: Date | string;
  value: T;
}

export function useTimedStorage<T>({
  keyName,
  initialValue = null,
  liveTime = 5 * 60 * 1000,
  storageOptions = {},
}: UseTimedStorageOptions<T>): WritableComputedRef<T | null> {
  const initialObj: TimedStorageVal<T> | null =
    initialValue === null
      ? null
      : {
          storedAt: new Date(),
          value: initialValue,
        };

  const storedVal = useSessionStorage<TimedStorageVal<T> | null>('[nh]' + keyName, initialObj, {
    ...storageOptions.serializer,
    serializer: storageOptions.serializer ?? {
      read: JSON.parse,
      write: JSON.stringify,
    },
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
      const msSinceStore = differenceInMilliseconds(new Date(), storedDate);
      console.log('MsStored:', msSinceStore, liveTime, msSinceStore > liveTime);

      if (Math.abs(msSinceStore) > liveTime) {
        storedVal.value = null;
      }

      return storedVal.value?.value ?? null;
    },
    set: (nv) => (storedVal.value = nv === null ? null : { storedAt: new Date(), value: nv }),
  });
}
