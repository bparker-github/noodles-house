import '../common/assets/main.css';

import { AuthGuardHook } from '@common';
import { useAuthStore } from '@noodles-house/common';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { RouterView } from 'vue-router';
import router from './router';

const app = createApp(RouterView);

// Add in pinia - allows (auth) stores to be referenced.
const pinia = createPinia();
app.use(pinia);

// Declare store only after pinia is applied.
const authStore = useAuthStore();

// Create router, sync store beforeEach, and guard specific routes.
app.use(router);
router.beforeEach(AuthGuardHook);

async function MountApp() {
  // Wait for router to be ready prevents race conditions when returning from loginRedirect or acquireTokenRedirect.
  await router.isReady();

  // Start/record the init of auth store.
  authStore.initializeStore();

  // Finally mount.
  app.mount('#app');
}

// Begin Mount.
MountApp();
