<template>
  <PageSpinner
    class="font-mono"
    spinner-size="xl"
  >
    <span class="text-xl font-semibold mt-8 mb-4">Checking your status...</span>
  </PageSpinner>
</template>

<script setup lang="ts">
import { RouteName } from '@/router/RouteName';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import PageSpinner from '../PageSpinner.vue';

export interface AuthenticationRedirectPageProps {
  /** The destination the user is sent when validated as authenticated. @default RouteName.HOME */
  authRoute?: RouteName;
  /** The destination the user is sent when validated has failed. @default RouteName.FAILED */
  unAuthRoute?: RouteName;
}

const authStore = useAuthStore();
const { currAccount } = storeToRefs(authStore);

const router = useRouter();
const props = withDefaults(defineProps<AuthenticationRedirectPageProps>(), {
  authRoute: RouteName.HOME,
  unAuthRoute: RouteName.FAILED,
});

onMounted(async () => {
  await authStore.initPromise;

  // Once auth has finalized, we should know if the user has an account implicitly already.
  router.push({ name: currAccount.value ? props.authRoute : props.unAuthRoute });
});
</script>
