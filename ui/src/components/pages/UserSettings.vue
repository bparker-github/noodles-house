<template>
  <div :class="['user-settings', 'flex flex-col flex-1', 'gap-y-3']">
    <NhButton
      :b-style="BStyle.SOLID"
      :b-theme="BTheme.CHALET_GREEN"
      :text="buttonText"
      :is-loading="isFetchMySettingsFetching"
      @click="getSettings"
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

    <div v-if="myUserSettings">
      My User Settings
      <PreCodeBlock :data="myUserSettings" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserSettings, type UserSettings } from '@/stores/userSettingsStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import PreCodeBlock from '../PreCodeBlock.vue';
import NhButton, { BStyle, BTheme } from '../basic/NhButton.vue';
import EditableInfoList, { type ModelFieldConfig } from '../forms/EditableInfoList.vue';

const EditableSettingsList = EditableInfoList<UserSettings>;

const userSettingsStore = useUserSettings();
const { myUserSettings, isFetchMySettingsFetching } = storeToRefs(userSettingsStore);

async function getSettings() {
  try {
    // Stuff
    await userSettingsStore.fetchMySettings(!!myUserSettings.value);
  } catch (ex) {
    // Error
    console.error('Cannot do:', ex);
  }
}

// Computed
const buttonText = computed(() => (myUserSettings.value ? 'Refresh Settings' : 'Get Settings'));

const fieldConfigs = computed<ModelFieldConfig<UserSettings>[]>(() => {
  if (!myUserSettings.value) {
    return [
      {
        key: 'id',
        label: 'No Settings',
        disabled: true,
        placeholder: 'No settings yet exist',
      },
    ];
  }

  const ret: ModelFieldConfig<UserSettings>[] = [
    {
      key: 'id',
      disabled: true,
      label: 'Id',
    },
    {
      key: 'userId',
      disabled: true,
      label: 'User Id',
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
      key: 'profileLink',
      disabled: true,
      label: 'Profile Link',
    },
  ];

  return ret;
});

function onSettingsSave() {
  console.log('Settings save:', arguments);
}
</script>
