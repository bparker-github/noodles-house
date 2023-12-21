<template>
  <div :class="['user-settings', 'flex flex-col flex-1', 'gap-y-3']">
    <NhButton
      :b-style="ButtonStyle.SOLID"
      :b-theme="DefaultTheme.BALI_HAI"
      text="Get Settings"
      :is-loading="isFetchMySettingsFetching"
      @click="getSettings"
    />

    <InfoListCard
      v-if="myUserSettings"
      title="User Settings"
      sub-title="These settings are entirely up to your preference, m'dear."
      :list="settingsList"
      class="rounded-md"
    />

    <div v-if="myUserSettings">
      My User Settings
      <PreCodeBlock :data="myUserSettings" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type EnumObject } from '@/lib';
import { useUserSettings } from '@/stores/userSettingsStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import NhButton, { ButtonStyle, DefaultTheme } from '../basic/NhButton.vue';
import InfoListCard from '../cards/InfoListCard.vue';
import PreCodeBlock from '../PreCodeBlock.vue';

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

const settingsList = computed<EnumObject[]>(() => {
  if (myUserSettings.value) {
    return Object.entries(myUserSettings.value).map(([label, value]) => ({
      label,
      value: value || '<none>',
    }));
  } else {
    return [
      {
        label: 'No User Settings saved yet!',
        value: 'null',
      },
    ];
  }
});
</script>
