import { defineConfig } from "vitest/config";

const vitestConfig = defineConfig({
  test: {
    watch: false,
  },
});

export default vitestConfig;
