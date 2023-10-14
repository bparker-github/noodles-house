<template>
  <PageSpinner
    class="font-mono"
    spinner-size="xl"
  >
    <span class="text-xl font-semibold mt-8 mb-4">Checking your status</span>
  </PageSpinner>
</template>

<script setup lang="ts">
import { useAuthStore } from '@noodles-house/common';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { useRouter } from 'vue-router';
import PageSpinner from '../components/PageSpinner.vue';

export interface AuthenticationRedirectPageProps {
  authRoute: RouteLocationRaw;
  unAuthRoute: RouteLocationRaw;
}

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

const router = useRouter();
const props = defineProps<AuthenticationRedirectPageProps>();

onMounted(async () => {
  router.push(isAuthenticated.value ? props.authRoute : props.unAuthRoute);
});
</script>
