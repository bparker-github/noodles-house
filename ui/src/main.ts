import './assets/main.css';

// import { AuthGuardHook, AuthPlugin, AuthPluginHook, AuthPluginOptions } from '@common';
// import { useAuthStore } from './stores/';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { RouterView } from 'vue-router';
// import { AuthPlugin } from './lib/auth/AuthPlugin';
import { AuthPluginHook } from './lib/auth/AuthPlugin.Hook';
import { AuthPluginOptions } from './lib/auth/AuthPluginOptions';
import { MsalVuePlugin } from './auth/MsalVuePlugin';
import router from './router';
import App from './App.vue';

const app = createApp(App);

// Add our msal config and auth.
app.use(new MsalVuePlugin());

// Add in pinia - allows (auth) stores to be referenced.
const pinia = createPinia();
app.use(pinia);

// Create router, sync store beforeEach, and guard specific routes.
app.use(router);
// router.beforeEach(AuthPluginHook);

async function MountApp() {
  // Wait for router to be ready prevents race conditions when returning from loginRedirect or acquireTokenRedirect.
  await router.isReady();

  // Finally mount.
  app.mount('#app');
}

// Begin Mount.
MountApp();
