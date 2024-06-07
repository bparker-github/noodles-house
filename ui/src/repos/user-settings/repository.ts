import { useNativeAuth } from '@/auth/useNativeAuth';
import { useAuthFetch } from '@/lib/useAuthFetch';
import { useTimedStorage } from '@/lib/useTimedStorage';
import { type IUserSettings } from '@nh/shared';
import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';

export const userSettingsRepository = defineStore('user-settings-repo', () => {
  // Set up the local ref for the settings
  //  Persist to session storage for performance on repeat page-loads.
  const myUserSettings = useTimedStorage<IUserSettings>('user-settings');

  // Computed values for the state.
  const myFullName = computed(() =>
    [myUserSettings.value?.firstName, myUserSettings.value?.lastName].filter((x) => !!x).join(' ')
  );

  // Load the native-auth for the user id.
  const { userId } = storeToRefs(useNativeAuth());
  type GET_Resp = { value: IUserSettings[] };
  const GET_fetch = useAuthFetch<GET_Resp>(
    computed(() => `/data-api/direct/user-settings/id/${userId.value ?? ''}`),
    {
      asJson: true,
      authRoleRequired: 'authenticated',
      immediate: false,
    }
  );

  async function getUserSettings(hardRefresh = false): Promise<IUserSettings | null> {
    if (!!myUserSettings.value?.id && !hardRefresh) {
      console.info('Already have data, skipping.');
      return myUserSettings.value;
    } else if (!userId.value) {
      console.error('Cannot get user settings without the user id');
      return null;
    } else if (GET_fetch.isFetching.value) {
      return await GET_fetch.then(() => myUserSettings.value);
    }

    // Execute the fetch, update our local ref settings, return the found value.
    try {
      await GET_fetch.execute();
      myUserSettings.value = GET_fetch.response.value?.ok
        ? GET_fetch.data.value?.value?.[0] ?? null
        : null;
      return myUserSettings.value;
    } catch (err) {
      console.error('Failed to get user settings:', err);
      return null;
    }
  }

  function clearSettingsCache() {
    myUserSettings.value = null;
  }

  return {
    // Refs
    myUserSettings,

    // Computed
    myFullName,

    // Fetch Hooks
    GET_fetch,

    // Functions
    clearSettingsCache,
    getUserSettings,
  };
});
