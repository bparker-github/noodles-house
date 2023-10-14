<template>
  <PageSpinner
    class="font-mono"
    spinner-size="xl"
  >
    <span class="text-2xl font-semibold mt-8 mb-4">Logging out...</span>
    <p>There may be a popup window open already, or it might have been blocked.</p>
  </PageSpinner>
</template>

<script setup lang="ts">
import { PageSpinner } from '@common';
import { useAuthStore } from '@noodles-house/common';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { RouteName } from '../router/RouteName';

const authStore = useAuthStore();
const router = useRouter();

async function beginLogout() {
  try {
    await authStore.doLogout();
    router.push({ name: RouteName.LANDING });
  } catch (err) {
    console.warn('Somehow error?:', err);
    router.push({ name: RouteName.FAILED });
  }
}

onMounted(beginLogout);
</script>
