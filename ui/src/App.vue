<template>
  <PageSpinner v-if="loading" />
  <RouterView v-else />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PageSpinner from './components/PageSpinner.vue';
import { useAuthPlugin } from './lib/auth/AuthPlugin';

const loading = ref(true);

const router = useRouter();
const authPlugin = useAuthPlugin();

onMounted(async () => {
  console.time('App');
  await router.isReady();
  console.timeLog('App', 'Router ready.');
  await authPlugin.value.initPromise;
  console.timeLog('App', 'AuthPlugin ready.');
  loading.value = false;
  console.timeEnd('App');
});
</script>
