import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueSvg from 'vite-svg-loader';
import postcss from './postcss.config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueSvg()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss,
  },
  envPrefix: 'NOOD_',
  server: {
    port: 9090,
  },
});
