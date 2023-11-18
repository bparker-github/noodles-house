<template>
  <PageSpinner v-if="loading" />
  <RouterView v-else />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PageSpinner from './components/PageSpinner.vue';
// import { useAuthStore } from './stores/authStore';

const loading = ref(true);

const router = useRouter();
// const authStore = useAuthStore();

onMounted(async () => {
  // Ensure the MSAL plugin has loaded.
  // await authStore.initPromise;
  console.log('AuthStore loaded.');

  // Ensure the router has loaded before continuing.
  await router.isReady();
  console.log('Router loaded.');

  // Complete loading.
  loading.value = false;
});
</script>

<style lang="css">
html,
body,
div#app {
  @apply h-full w-full;
}
</style>
