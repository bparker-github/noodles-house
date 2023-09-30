<template>
  <LoadingSpinner />
  <div>Doing logout...</div>
</template>

<script setup lang="ts">
import { LoadingSpinner } from '@common';
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
