<template>
  <PageSpinner title="Logging out..." />
</template>

<script setup lang="ts">
import { useNativeAuth } from '@/auth/useNativeAuth';
import PageSpinner from '@/components/spinners/PageSpinner.vue';
import { userSettingsRepository } from '@/repos/user-settings';
import { onBeforeMount } from 'vue';

const authStore = useNativeAuth();
const userSettings = userSettingsRepository();

onBeforeMount(() => {
  authStore.clearAuthCache();
  userSettings.clearSettingsCache();

  window.location.pathname = '/logout';
});
</script>
