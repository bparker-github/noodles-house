<template>
  <PageSpinner title="Logging out..." />
</template>

<script setup lang="ts">
import { useNativeAuth } from '@/auth/useNativeAuth';
import PageSpinner from '@/components/spinners/PageSpinner.vue';
import { onBeforeMount } from 'vue';

const authStore = useNativeAuth();

onBeforeMount(() => {
  authStore.clearAuthCache();
  window.location.pathname = '/logout';
});
</script>
