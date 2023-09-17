import '@ui/common/assets/main.css';

import { useAuthStore } from '@nh/shared';
import { AuthGuardRedirect, applyNavigationRouter } from '@ui-auth';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { RouterView } from 'vue-router';
import router from './router';

const app = createApp(RouterView);

// Add in pinia - allows (auth) stores to be referenced.
const pinia = createPinia();
app.use(pinia);

const authStore = useAuthStore();

// Add in the vue router, guard authenticated routes.
app.use(router);
router.beforeEach(AuthGuardRedirect);

// Control MSAL routing with router.
applyNavigationRouter(router, authStore);

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
