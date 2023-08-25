import './assets/tailwind.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import { RouterView } from 'vue-router';
import { useAuthStore } from '@/core';

const app = createApp(RouterView);

// Add in pinia - allows (auth) stores to be referenced.
const pinia = createPinia();
app.use(pinia);

const authStore = useAuthStore();

// Add in the vue router.
app.use(router);

// Control MSAL routing with route.r
authStore.applyNavigationRouter(router);

async function MountApp() {
  // Msal needs to init.
  await authStore.instance.initialize();

  // Wait for router to be ready prevents race conditions when returning from loginRedirect or acquireTokenRedirect.
  await router.isReady();

  // Finally mount.
  app.mount('#app');
}

// Begin Mount.
MountApp();
