<template>
  <LoadingSpinner />
</template>

<script setup lang="ts">
import { useAuthStore } from '@nh/shared';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { useRouter } from 'vue-router';
import LoadingSpinner from '../components/LoadingSpinner.vue';

export interface AuthenticationRedirectPageProps {
  authRoute: RouteLocationRaw;
  unAuthRoute: RouteLocationRaw;
}

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

const router = useRouter();
const props = defineProps<AuthenticationRedirectPageProps>();

onMounted(() => {
  router.push(isAuthenticated.value ? props.authRoute : props.unAuthRoute);
});
</script>
