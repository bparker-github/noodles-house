import { envConfig } from '@/config/env';
import type { Permission, Role } from '@/lib';
import { useFetch, useSessionStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

export const useAuthApiStore = defineStore('auth-api-store', () => {
  const allPerms = useSessionStorage<Permission[]>('nh-perms', []);
  const allRoles = useSessionStorage<Role[]>('nh-roles', []);

  const permFetch = useFetch(envConfig.apiUrl + '/scheme/permissions');
  const roleFetch = useFetch(envConfig.apiUrl + '/scheme/roles');

  const initPromise = Promise.all([permFetch, roleFetch]);

  const isFetching = computed(() => permFetch.isFetching.value || roleFetch.isFetching.value);
  const fetchError = computed(() => permFetch.error.value || roleFetch.error.value);

  return {
    permissions: allPerms,
    roles: allRoles,

    initPromise,

    isFetching,
    fetchError,
  };
});
