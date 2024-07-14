<template>
  <PageSpinner title="Logging out..." />
</template>

<script setup lang="ts">
import { useNativeAuth } from '@/auth/useNativeAuth';
import PageSpinner from '@/components/spinners/PageSpinner.vue';
import { userSettingsRepository } from '@/repos/user-settings';
import { useTaskStore } from '@/stores/tasksStore';
import { onBeforeMount } from 'vue';

onBeforeMount(() => {
  useNativeAuth().clearAuthCache();
  userSettingsRepository().clearSettingsCache();
  useTaskStore().clearTasksCache();

  window.location.pathname = '/logout';
});
</script>
