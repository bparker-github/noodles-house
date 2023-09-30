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
    // This has to match ../../tsconfig.base.json
    alias: {
      ...makeAlias('@nh/blur-hash', '../../modules/blur-hash/src/*'),
      ...makeAlias('@nh/common', '../../modules/common/src/*'),
      ...makeAlias('@nh/auth-ui', '../../ui/src/common/auth/index.ts'),
      ...makeAlias('@nh/common-ui', '../../ui/src/common/index.ts'),
      ...makeAlias('@nh/tailwind-ui', '../../ui/src/tailwind/index.ts'),
    },
  },
  css: {
    postcss,
  },
  envPrefix: 'NOOD_',
  envDir: '../..',
  server: {
    port: 9090,
  },
  preview: {
    port: 9090,
  },
});
