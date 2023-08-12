import { fileURLToPath } from 'node:url';
import { mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

const testConfig = defineConfig({
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    transformMode: {
      web: [/\.[jt]sx$/]
    }
  }
});

export default mergeConfig(
  viteConfig,
  typeof testConfig === 'function'
    ? testConfig({
        command: import.meta.env.PROD ? 'build' : 'serve',
        mode: import.meta.env.MODE
      })
    : testConfig
);
