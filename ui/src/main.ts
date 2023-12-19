import './assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { NativeAuthGuard } from './auth/NativeAuthGuard';

const app = createApp(App);

// Add in pinia - allows (auth) stores to be referenced.
const pinia = createPinia();
app.use(pinia);

// Create router, sync store beforeEach, and guard specific routes.
app.use(router);
router.beforeEach(NativeAuthGuard);

// Begin Mount.
app.mount('#app');
