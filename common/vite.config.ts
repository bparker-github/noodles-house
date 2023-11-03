import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './lib/index.ts',
      name: 'NoodlesHouseCommon',
      fileName: 'noodles-house-common'
    }
  },
  envDir: "..",
  envPrefix: "NOOD",
})
