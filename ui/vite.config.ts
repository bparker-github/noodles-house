import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueSvg from 'vite-svg-loader';
import postcss from './postcss.config.mjs';
import { url } from 'node:inspector';

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
      '@db': fileURLToPath(new URL('../swa-db-connections', import.meta.url)),
    },
  },
  css: {
    postcss,
  },
  envPrefix: 'NOOD_',
  envDir: '..',
  server: {
    port: 9090,
    // https: {
    //   key: readFileSync('../https/privateKey.key'),
    //   cert: readFileSync('../https/certificate.crt'),
    // },
  },
  preview: {
    port: 9090,
    // https: true,
  },
});
