<template>
  <PageSpinner
    class="font-mono"
    spinner-size="xl"
  >
    <span class="text-2xl font-semibold mt-8 mb-4">Checking your status</span>
    <p>damn, this shit's hard...</p>
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
const { msalPCA, isAuthenticated } = storeToRefs(authStore);

const router = useRouter();
const props = defineProps<AuthenticationRedirectPageProps>();

onMounted(async () => {
  // await msalPCA.value.initialize();
  // router.push(isAuthenticated.value ? props.authRoute : props.unAuthRoute);
});
</script>
