import type { Permission, Role } from '@/lib';
import { useFetch, useSessionStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useAuthApiStore = defineStore('auth-api-store', () => {
  const getApiUrl = () => {
    if (!window?.location?.origin) {
      throw new Error('Cannot find window location origin.');
    }
    return window.location.origin + '/api';
  };

  const allPerms = useSessionStorage<Permission[]>('nh-perms', []);
  const allRoles = useSessionStorage<Role[]>('nh-roles', []);

  const permFetch = useFetch(getApiUrl + '/scheme/permissions');
  const roleFetch = useFetch(getApiUrl + '/scheme/roles');

  const isFetching = computed(() => permFetch.isFetching.value || roleFetch.isFetching.value);
  const isFinished = computed(() => permFetch.isFinished.value || roleFetch.isFinished.value);
  const fetchError = computed(() => permFetch.error.value || roleFetch.error.value);

  async function initialize(): Promise<void> {
    await Promise.all([permFetch.then(), roleFetch.then()]);
  }

  return {
    permissions: allPerms,
    roles: allRoles,

    initialize,

    isFetching,
    isFinished,
    fetchError,
  };
});
