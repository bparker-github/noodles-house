<template>
  <div class="overflow-hidden rounded-lg bg-white shadow">
    <div class="flex items-center justify-center px-4 py-5 sm:p-6">
      <LoadingSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

router.push(isAuthenticated.value ? '/home' : '/welcome');
</script>
