import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueSvg from 'vite-svg-loader';
import postcss from './postcss.config';

function makeAlias(key: string, val: string): Record<string, string> {
  return {
    [key]: fileURLToPath(new URL(val, import.meta.url)),
  };
}

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
    // This has to match ../../tsconfig.paths.json
    alias: {
      ...makeAlias('@shared', '../shared/src/index.ts'),
      ...makeAlias('@ui', './src'),
      ...makeAlias('@ui/auth', './src/common/auth/index.ts'),
      ...makeAlias('@ui/common', './src/common/index.ts'),
    },
  },
  css: {
    postcss,
  },
  envPrefix: 'NOOD_',
  envDir: '../../',
  server: {
    port: 9090,
  },
  preview: {
    port: 9090,
  },
});
