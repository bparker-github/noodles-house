<template>
  <div class="px-6 pt-14 lg:px-8">
    <div class="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
      <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        Authentication Result
      </h2>
      <p class="mt-6 text-lg leading-8 text-gray-300">{{ user }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>
