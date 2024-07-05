import { StorageSerializers, useStorage } from '@vueuse/core';
import { differenceInMilliseconds, parseISO } from 'date-fns';
import { WritableComputedRef, computed } from 'vue';
import type { TimedStorageVal } from './timedStorageVal';
import type { UseTimedStorageOptions } from './useTimedStorageOptions';

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
    ...storageOptions,
    serializer: StorageSerializers.object,
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

export type { TimedStorageVal } from './timedStorageVal';
export type { UseTimedStorageOptions } from './useTimedStorageOptions';
