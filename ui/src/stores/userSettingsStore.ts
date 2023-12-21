import { useFetch, useSessionStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';

/** Required headers for the API /data-api */
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
  /** FetchFunctions to handle the requests and their states */
  const Fetch_GetMySettings = useFetch<UserSettings | null>('/api/settings', {
    immediate: false,
    afterFetch: (ctx) => {
      myUserSettings.value = !ctx.response.ok ? null : ctx.data;
      return ctx;
    },
  }).json<UserSettings | null>();
  function fetchMySettings(force = false) {
    if (force) {
      myUserSettings.value = null;
    }
    return Fetch_GetMySettings.execute();
  }

  // Use local variables here to manage the longer term storage of the cur settings.
  const myUserSettings = useSessionStorage<UserSettings | null>(
    'noodles-house-user-settings',
    Fetch_GetMySettings.data.value ?? null,
    { serializer: { read: JSON.parse, write: JSON.stringify } }
  );

  return {
    // Refs
    myUserSettings,

    // Computed
    isFetchMySettingsFetching: computed(() => Fetch_GetMySettings.isFetching.value),
    isFetchMySettingsFinished: computed(() => Fetch_GetMySettings.isFinished.value),
    isFetchMySettingsError: computed(() => Fetch_GetMySettings.error.value),

    // Functions
    fetchMySettings,
  };
});
