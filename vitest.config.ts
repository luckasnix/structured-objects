import { defineConfig } from "vitest/config";

const vitestConfig = defineConfig({
  test: {
    watch: false,
    restoreMocks: true,
  },
});

export default vitestConfig;
