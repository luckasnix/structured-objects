import { resolve } from 'path';
import { defineConfig } from 'vitest/config';
import dts from 'vite-plugin-dts';

export default defineConfig({
  test: {
    watch: false,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'StructuredObjects',
      formats: ['es'],
      fileName: 'index',
    },
  },
  plugins: [
    dts({
      include: ['src'],
      exclude: ['src/**/*.(test|mock).ts'],
      rollupTypes: true,
    })
  ],
});
