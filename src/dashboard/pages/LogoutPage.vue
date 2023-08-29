<template>
  <LoadingSpinner />
  <div>Doing logout...</div>
</template>

<script setup lang="ts">
import { LoadingSpinner, useAuthStore } from '@/core';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { RouteName } from '../router/RouteName';

const authStore = useAuthStore();
const router = useRouter();

async function beginLogout() {
  try {
    await authStore.doLogout();
    router.push(RouteName.LANDING);
  } catch (err) {
    console.warn('Somehow error?:', err);
    router.push(RouteName.FAILED);
  }
}

onMounted(beginLogout);
</script>
