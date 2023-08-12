<template>
  <div>Loading...</div>
</template>

<script setup lang="ts">
import { useAuth } from '@/lib/auth/useAuth';
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const mountedHook = onMounted(async () => {
  const { app, loginRequest, handleLoginRedirect, doRedirectLogin } = useAuth();
  const router = useRouter();

  try {
    const loginResult = await handleLoginRedirect();
    console.debug('Login Result:', loginResult);

    router.push('/home');
  } catch (err) {
    console.debug('Login Failure:', err);

    await app.loginRedirect(loginRequest);
  }
});

onUnmounted(() => !mountedHook ? void 0 : mountedHook())
</script>
