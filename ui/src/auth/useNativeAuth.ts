import { useFetch } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import type { NativeUser } from './NativeUser';

export const useNativeAuth = defineStore('native-swa-auth', () => {
  const nativeAuthFetch = useFetch('/.auth/me', { immediate: false }).json();

  const curUser = computed<NativeUser | null>(() => {
    if (!nativeAuthFetch.isFinished.value || nativeAuthFetch.isFetching.value) {
      return null;
    }

    return nativeAuthFetch.data.value;
  });
  const isFetching = computed(() => nativeAuthFetch.isFetching.value);
  const isFinished = computed(() => nativeAuthFetch.isFinished.value);
  const fetchError = computed(() => nativeAuthFetch.error.value);

  function doFetch() {
    nativeAuthFetch.execute();
  }

  return {
    curUser,

    isFetching,
    isFinished,
    fetchError,

    doFetch,
  };
});
