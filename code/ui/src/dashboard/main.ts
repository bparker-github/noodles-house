import '../common/assets/main.css';

import { AuthGuardRedirect, getAuthStoreSyncHook } from '@common';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { RouterView } from 'vue-router';
import router from './router';

const app = createApp(RouterView);

// Add in pinia - allows (auth) stores to be referenced.
const pinia = createPinia();
app.use(pinia);

// Create router, sync store beforeEach, and guard specific routes.
app.use(router);
router.beforeEach(getAuthStoreSyncHook(router));
router.beforeEach(AuthGuardRedirect);

async function MountApp() {
  // Wait for router to be ready prevents race conditions when returning from loginRedirect or acquireTokenRedirect.
  await router.isReady();

  // Finally mount.
  app.mount('#app');
}

// Begin Mount.
MountApp();
