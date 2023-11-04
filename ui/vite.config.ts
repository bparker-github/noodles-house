import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vueSvg from 'vite-svg-loader';
import vue from '@vitejs/plugin-vue';
import postcss from './postcss.config.mjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSvg({
      svgoConfig: {
        plugins: [
          'preset-default',
          {
            name: 'prefixIds',
            params: {
              prefix: true,
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss,
  },
  envPrefix: 'NOOD_',
  envDir: '..',
  server: {
    port: 9090,
  },
  preview: {
    port: 9090,
  },
});