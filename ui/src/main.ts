import './assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

// Add in pinia - allows (auth) stores to be referenced.
const pinia = createPinia();
app.use(pinia);

// Create router, sync store beforeEach, and guard specific routes.
app.use(router);
// router.beforeEach(AuthPluginHook);

// Begin Mount.
app.mount('#app');
