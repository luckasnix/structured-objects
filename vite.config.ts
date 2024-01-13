import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

export default defineConfig({
  test: {
    watch: false,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'ObjectGraph',
      formats: ['es'],
      fileName: 'main',
    },
  },
  plugins: [
    dts({
      include: ['src'],
      exclude: ['src/**/*.(test|mock).ts'],
    })
  ],
});
