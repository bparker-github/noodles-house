<template>
  <div :class="['user-settings', 'flex flex-col flex-1', 'gap-y-3']">
    <NhButton
      :b-style="ButtonStyle.SOLID"
      :b-theme="DefaultTheme.BALI_HAI"
      :text="buttonText"
      :is-loading="isFetchMySettingsFetching || true"
      @click="getSettings"
    />

    <EditableSettingsList
      v-if="myUserSettings"
      v-model:data="myUserSettings"
      :model-labels="settingsLabels"
      :update-model-val="updateModelVal"
      title="User Settings"
      sub-title="These settings are entirely up to your preference, m'dear."
      @on-save="onSettingsSave"
    />

    <div v-if="myUserSettings">
      My User Settings
      <PreCodeBlock :data="myUserSettings" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type EnumObject } from '@/lib';
import { useUserSettings, type UserSettings } from '@/stores/userSettingsStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import NhButton, { ButtonStyle, DefaultTheme } from '../basic/NhButton.vue';
import PreCodeBlock from '../PreCodeBlock.vue';
import EditableInfoList from '../forms/EditableInfoList.vue';

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
const settingsLabels = computed<EnumObject<keyof UserSettings>[]>(() =>
  !myUserSettings.value
    ? [
        {
          label: 'No User Settings saved yet!',
          value: null as unknown as keyof UserSettings,
        },
      ]
    : Object.entries(myUserSettings.value).map(([label, value]) => ({
        label,
        value: label as keyof UserSettings,
      }))
);

function updateModelVal<K extends keyof UserSettings>(key: K, newVal: UserSettings[K]) {
  // Short circuit if something fishy happens.
  if (!myUserSettings.value || !(key in myUserSettings.value)) {
    console.log('error updating model val:', key, newVal);
    return myUserSettings.value ?? undefined;
  }

  myUserSettings.value = {
    ...myUserSettings.value,
    [key]: newVal,
  };

  return myUserSettings.value;
}

function onSettingsSave() {}
</script>
