import { defineConfig } from "tsdown";

const tsdownConfig = defineConfig({
  entry: {
    index: "src/index.ts",
    "similarity-graph": "src/similarity-graph.ts",
  },
  dts: true,
  fixedExtension: false,
  format: "esm",
  unbundle: true,
});

export default tsdownConfig;
