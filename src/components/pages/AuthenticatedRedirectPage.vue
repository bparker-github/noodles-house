<template>
  <LoadingSpinner />
</template>

<script lang="ts">
export interface AuthenticationRedirectPageProps {
  authRoute: RouteLocationRaw;
  unAuthRoute: RouteLocationRaw;
}
</script>

<script setup lang="ts">
import { LoadingSpinner } from '@/components';
import { useAuthStore } from '@/core';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

const router = useRouter();
const props = defineProps<AuthenticationRedirectPageProps>();

onMounted(() => {
  router.push(isAuthenticated.value ? props.authRoute : props.unAuthRoute);
});
</script>
