import { useFetch } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import type { NativeUser } from './NativeUser';

export const useNativeAuth = defineStore('native-swa-auth', () => {
  const nativeAuthFetch = useFetch('/.auth/me', { immediate: false }).json<NativeUser | null>();

  const curUser = computed(() => nativeAuthFetch.data.value ?? null);
  const isFetching = computed(() => nativeAuthFetch.isFetching.value);
  const isFinished = computed(() => nativeAuthFetch.isFinished.value);
  const fetchError = computed(() => nativeAuthFetch.error.value);

  const isAuthenticated = computed(() => !!curUser.value?.clientPrincipal);

  function doFetch(force = false) {
    // Short circuit if we already have a user, and aren't forcing a reload.
    if (!!curUser.value && !force) {
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

    isFetching,
    isFinished,
    fetchError,
    isAuthenticated,

    doFetch,
  };
});
