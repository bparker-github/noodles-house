<template>
  <div :class="['user-settings', 'flex flex-col flex-1']">
    <NhButton
      v-if="!curSettings"
      :b-style="ButtonStyle.SOLID"
      :b-theme="DefaultTheme.BALI_HAI"
      text="Get Settings"
      :is-loading="isFetching"
      @click="getSettings"
    />

    <code v-else>
      <pre>{{ JSON.stringify(curSettings) }}</pre>
    </code>
  </div>
</template>

<script setup lang="ts">
import { useNativeAuth } from '@/auth/useNativeAuth';
import TextboxInput from '@/components/inputs/TextboxInput.vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import NhButton, { ButtonStyle, DefaultTheme } from '../basic/NhButton.vue';
import { useFetch } from '@vueuse/core';
import { computed } from 'vue';
import { useUserSettings } from '@/stores/userSettingsStore';

const userSettingsStore = useUserSettings();
const { curSettings } = storeToRefs(userSettingsStore);
const { getAllUserSettingsFetch } = userSettingsStore;

console.log(
  'UserSettingFetchIn:',
  getAllUserSettingsFetch,
  userSettingsStore,
  userSettingsStore.getAllUserSettingsFetch
);

const isFetching = computed(() => getAllUserSettingsFetch.isFetching);

async function getSettings() {
  try {
    // Stuff
    await getAllUserSettingsFetch.execute();
  } catch (ex) {
    // Error
    console.error('Cannot do:', ex);
  }
}
</script>
