import { useNativeAuth } from '@/auth/useNativeAuth';
import { useFetch } from '@vueuse/core';
import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';

const DEFAULT_headers = {
  headers: {
    'Content-Type': 'application/json',
    'X-MS-API-ROLE': 'authenticated',
  },
};

export interface UserSettings {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  profileLink: string;
}

export const useUserSettings = defineStore('user-settings-store', () => {
  const baseRoute = '/data-api/api/UserSettings';

  const { curUser } = storeToRefs(useNativeAuth());

  const getUserSettingsUrl = computed(
    () => baseRoute + '/userId/' + curUser.value?.clientPrincipal.userId
  );

  const getAllUserSettingsFetch = useFetch<UserSettings[]>(
    '/data-api/api/UserSettings',
    DEFAULT_headers,
    { immediate: false }
  ).json<UserSettings[]>();

  const getUserSettingsFetch = useFetch<UserSettings | null>(getUserSettingsUrl, DEFAULT_headers, {
    immediate: false,
  }).json<UserSettings | null>();

  const curSettings = computed(() =>
    !getUserSettingsFetch.isFinished.value ? null : getUserSettingsFetch.data.value
  );

  return {
    curSettings,

    getUserSettingsFetch,
    getAllUserSettingsFetch,
  };
});
