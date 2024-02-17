<template>
  <div :class="['user-settings', 'flex flex-col flex-1', 'gap-y-3']">
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
      @submit="onSettingsSave"
    />
  </div>
</template>

<script setup lang="ts">
import { useNativeAuth } from '@/auth/useNativeAuth';
import {
  getDefaultUserSettings,
  userSettingsRepository,
  type UserSettings,
} from '@/repos/user-settings';
import { useFetch } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import NhButton, { BStyle, BTheme } from '../basic/NhButton.vue';
import EditableInfoList, { type ModelFieldConfig } from '../forms/EditableInfoList.vue';

const EditableSettingsList = EditableInfoList<UserSettings>;

const { userId } = storeToRefs(useNativeAuth());

const userSettingsRepo = userSettingsRepository();
const { myUserSettings } = storeToRefs(userSettingsRepo);

// Computed
const buttonText = computed(() => (myUserSettings.value ? 'Refresh Settings' : 'Get Settings'));
const fieldConfigs: ModelFieldConfig<UserSettings>[] = [
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

// Functions
async function getUserSettings(): Promise<void> {
  const foundSettings = await userSettingsRepo.getUserSettings();

  myUserSettings.value = foundSettings ?? getDefaultUserSettings(userId.value ?? '');
}

async function onSettingsSave(toSave: UserSettings) {
  const { id, ...withoutId } = toSave;

  const saveFetch = useFetch(
    `/data-api/direct/user-settings/id/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': 'authenticated',
      },
      body: JSON.stringify(withoutId),
    },
    { immediate: false }
  );

  await saveFetch.execute();
}
</script>
