import { useNativeAuth } from '@/auth/useNativeAuth';
import { useFetch, useSessionStorage } from '@vueuse/core';
import { defineStore, storeToRefs } from 'pinia';
import { type IUserSettings } from '@db/models/UserSettings.d';
import { getFetchHeaders } from '../helpers';
import { computed } from 'vue';

export const userSettingsRepository = defineStore('user-settings-repo', () => {
  // Set up the local ref for the settings
  //  Persist to session storage for performance on repeat page-loads.
  const myUserSettings = useSessionStorage<IUserSettings | null>('user-settings-temp', null, {
    serializer: { read: JSON.parse, write: JSON.stringify },
  });

  // Computed values for the state.
  const myFullName = computed(() => {
    const ret = [myUserSettings.value?.firstName, myUserSettings.value?.lastName]
      .filter((x) => !!x)
      .join(' ');
    return ret;
  });

  // Load the native-auth for the user id.
  const { userId } = storeToRefs(useNativeAuth());
  type GET_Resp = { value: IUserSettings[] };
  const GET_fetch = useFetch<GET_Resp>(
    `/data-api/direct/user-settings/id/${userId.value ?? ''}`,
    {
      headers: getFetchHeaders('authenticated'),
      method: 'GET',
    },
    { immediate: false }
  ).json<GET_Resp>();

  async function getUserSettings(): Promise<IUserSettings | null> {
    if (!userId.value) {
      console.error('Cannot get user settings without the user id');
      return null;
    }

    // Execute the fetch, update our local ref settings, return the found value.
    try {
      await GET_fetch.execute();
      myUserSettings.value = GET_fetch.response.value?.ok ? GET_fetch.data.value?.value?.[0] : null;
      return myUserSettings.value;
    } catch (err) {
      console.error('Failed to get user settings:', err);
      return null;
    }
  }

  return {
    // Refs
    myUserSettings,

    // Computed
    myFullName,

    // Fetch Hooks
    GET_fetch,

    // Functions
    getUserSettings,
  };
});
