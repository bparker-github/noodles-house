import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'Unsplashjs-React',
      fileName: 'unsplash-js-react',
    },
  },
});
