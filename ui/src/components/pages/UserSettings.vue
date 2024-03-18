<template>
  <div :class="['user-settings', 'flex flex-col flex-1 gap-y-3 px-2']">
    <NhButton
      :b-style="BStyle.SOLID"
      :b-theme="BTheme.CHALET_GREEN"
      :text="buttonText"
      :is-loading="userSettingsRepo.GET_fetch.isFetching"
      @click="getUserSettings"
    />

    <EditableSettingsList
      v-if="myUserSettings"
      v-model:data="myUserSettings"
      id="user-settings-form"
      :field-configs="fieldConfigs"
      title="User Settings"
      sub-title="These settings are entirely up to your preference, m'dear."
      :is-submitting="updateFunc.isFetching.value"
      @submit="onSettingsSave"
    />

    <div
      v-if="updateFunc.error.value"
      class="error-section flex flex-1 text-sm text-danger"
    >
      <code>{{ updateFunc.error.value }}</code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNativeAuth } from '@/auth/useNativeAuth';
import { useAuthFetch } from '@/lib/useAuthFetch';
import { getDefaultUserSettings, userSettingsRepository } from '@/repos/user-settings';
import type { IUserSettings } from '@db/models/UserSettings.d';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import NhButton, { BStyle, BTheme } from '../basic/NhButton.vue';
import EditableInfoList, { type ModelFieldConfig } from '../forms/EditableInfoList.vue';

const EditableSettingsList = EditableInfoList<IUserSettings>;

const { userId } = storeToRefs(useNativeAuth());

const userSettingsRepo = userSettingsRepository();
const { myUserSettings } = storeToRefs(userSettingsRepo);

// Computed
const buttonText = computed(() => (myUserSettings.value ? 'Refresh Settings' : 'Get Settings'));
const fieldConfigs: ModelFieldConfig<IUserSettings>[] = [
  {
    key: 'id',
    disabled: true,
    label: 'Id',
  },
  {
    key: 'firstName',
    label: 'First Name',
    placeholder: 'John',
  },
  {
    key: 'lastName',
    label: 'Last Name',
    placeholder: 'Smith',
  },
  {
    key: 'profileImageUrl',
    disabled: true,
    label: 'Profile Link',
  },
];

const updateFuncUrl = computed(
  () => `/data-api/direct/user-settings/id/${myUserSettings.value?.id}`
);
const updateFunc = useAuthFetch(updateFuncUrl, {
  authRoleRequired: 'authenticated',
  immediate: false,
  method: 'PUT',
});

// Functions
async function getUserSettings(): Promise<void> {
  const foundSettings = await userSettingsRepo.getUserSettings(true);

  myUserSettings.value = foundSettings ?? getDefaultUserSettings(userId.value ?? '');
}

async function onSettingsSave(toSave: IUserSettings) {
  const { id, ...withoutId } = toSave;

  const putFetch = updateFunc.put(withoutId);

  await putFetch.execute();
}
</script>
