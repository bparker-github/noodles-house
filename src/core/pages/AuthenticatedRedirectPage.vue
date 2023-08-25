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
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../auth/AuthStore';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { useRouter } from 'vue-router';
import type { RouteLocationRaw } from 'vue-router';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

const router = useRouter();
const props = defineProps<AuthenticationRedirectPageProps>();

onMounted(() => {
  router.push(isAuthenticated.value ? props.authRoute : props.unAuthRoute);
});
</script>
