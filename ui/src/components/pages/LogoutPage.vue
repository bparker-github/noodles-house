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
import { RouteName } from '@/router/RouteName';
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  // Ensure we have initialized
  // await authStore.initPromise;

  // Redirect to landing, or failed if errors.
  let name = RouteName.LANDING;
  await authStore.doLogout().catch((err) => {
    console.warn('Somehow error?:', err);
    name = RouteName.FAILED;
  });

  // Do the pushing.
  router.push({ name });
});
</script>
