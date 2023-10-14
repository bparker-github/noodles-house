import '../common/assets/main.css';

import { AuthGuardRedirect, CustomNavigationClient } from '@common';
import { useAuthStore } from '@noodles-house/common';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { RouterView } from 'vue-router';
import router from './router';

const app = createApp(RouterView);

// Add in pinia - allows (auth) stores to be referenced.
const pinia = createPinia();
app.use(pinia);

// Reference the pinia store AFTER creating pinia.
const authStore = useAuthStore();

// Add in the vue router, guard authenticated routes.
app.use(router);
router.beforeEach(AuthGuardRedirect);

async function MountApp() {
  // Initialize the Auth Store.
  const navClient = new CustomNavigationClient(router);
  await authStore.initializeStore(navClient);

  // Wait for router to be ready prevents race conditions when returning from loginRedirect or acquireTokenRedirect.
  await router.isReady();

  // Finally mount.
  app.mount('#app');
}

// Begin Mount.
MountApp();
