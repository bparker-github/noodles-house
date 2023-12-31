import { useFetch, useSessionStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import type { NativeUser } from './NativeUser';

export const useNativeAuth = defineStore('native-swa-auth', () => {
  const curUser = useSessionStorage<NativeUser | null>('native-auth-me', null, {
    serializer: { read: JSON.parse, write: JSON.stringify },
  });

  const nativeAuthFetch = useFetch('/.auth/me', {
    immediate: false,
    afterFetch: (ctx) => (curUser.value = ctx.data),
  }).json<NativeUser | null>();

  const isFetching = computed(() => nativeAuthFetch.isFetching.value);
  const isFinished = computed(() => nativeAuthFetch.isFinished.value);
  const fetchError = computed(() => nativeAuthFetch.error.value);

  const isAuthenticated = computed(() => !!curUser.value?.clientPrincipal);
  const userId = computed(() => curUser.value?.clientPrincipal.userId);

  function doFetch(force = false) {
    // Short circuit if we are already authenticated, and aren't forcing a reload.
    if (isAuthenticated.value && !force) {
      return;
    }
    // Ensure we aren't duplicating it.
    if (nativeAuthFetch.isFetching.value) {
      return;
    }

    // Otherwise, make the request.
    return nativeAuthFetch.execute();
  }

  return {
    curUser,

    userId,

    isFetching,
    isFinished,
    fetchError,
    isAuthenticated,

    doFetch,
  };
});
