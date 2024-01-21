<template>
  <PageSpinner
    v-if="loading"
    class="initial-loader"
  />
  <RouterView
    v-else
    class="relative"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PageSpinner from './components/spinners/PageSpinner.vue';
import { useNativeAuth } from './auth/useNativeAuth';

const loading = ref(true);

const router = useRouter();
const nativeAuth = useNativeAuth();

onMounted(async () => {
  await Promise.all([
    // Complete the 'auth/me' call.
    nativeAuth.doFetch(),
    // Ensure the router has loaded before continuing.
    router.isReady(),
  ]);

  // Complete loading.
  loading.value = false;
});
</script>

<style lang="css">
html,
body,
div#app {
  @apply flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden;
}
</style>
