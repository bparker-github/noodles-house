import { useNativeAuth } from '@/auth/useNativeAuth';
import { useFetch } from '@vueuse/core';
import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';

const DEFAULT_headers = {
  headers: {
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
  const baseRoute = '/data-api/rest/UserSettings';

  const { curUser } = storeToRefs(useNativeAuth());

  const getUserSettingsUrl = computed(
    () => baseRoute + '/userId/' + curUser.value?.clientPrincipal.userId
  );

  const getUserSettingsFetch = useFetch(getUserSettingsUrl, DEFAULT_headers, {
    immediate: false,
  }).json<UserSettings | null>();

  const curSettings = computed(() =>
    !getUserSettingsFetch.isFinished.value ? null : getUserSettingsFetch.data.value
  );

  return {
    curSettings,

    getUserSettingsFetch,
  };
});
