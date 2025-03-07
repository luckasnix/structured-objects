import { defineConfig } from "vitest/config";

const vitestConfig = defineConfig({
  test: {
    watch: false,
    restoreMocks: true,
    coverage: {
      include: ["src/object-*.ts"],
    },
  },
});

export default vitestConfig;
