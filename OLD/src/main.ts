import './assets/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { MsalPlugin } from './lib/auth/MsalPlugin';
import router from './router';
import App from './App.vue';

const app = createApp(App);

// Install MsalPlugin first so the config is provided to app context.
app.use(MsalPlugin);

app.use(createPinia());
app.use(router);

app.mount('#app');
