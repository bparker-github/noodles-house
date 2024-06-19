import { useTimedStorage } from '@/lib/useTimedStorage';
import { useFetch } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import type { NativeUser } from './NativeUser';

export const useNativeAuth = defineStore('native-swa-auth', () => {
  const curUser = useTimedStorage<NativeUser>({ keyName: 'auth-me' });

  const nativeAuthFetch = useFetch('/.auth/me', {
    immediate: false,
    afterFetch: (ctx) => (curUser.value = ctx.data),
    onFetchError: (ctx) => ((curUser.value = null), ctx),
  }).json<NativeUser | null>();

  const isFetching = computed(() => nativeAuthFetch.isFetching.value);
  const isFinished = computed(() => nativeAuthFetch.isFinished.value);
  const fetchError = computed(() => nativeAuthFetch.error.value);

  const isAuthenticated = computed(() => !!curUser.value?.clientPrincipal);
  const userId = computed(() => curUser.value?.clientPrincipal?.userId);

  async function doFetch(force = false): Promise<void> {
    // Return the promise that's awaiting this fetch.
    if (nativeAuthFetch.isFetching.value) {
      await nativeAuthFetch;
      return;
    }

    // Perform the fetch if forced or un-auth'd
    if (force || !isAuthenticated.value) {
      await nativeAuthFetch.execute();
    }
  }

  function clearAuthCache() {
    curUser.value = null;
  }

  return {
    curUser,

    userId,

    isFetching,
    isFinished,
    fetchError,
    isAuthenticated,

    clearAuthCache,
    doFetch,
  };
});
