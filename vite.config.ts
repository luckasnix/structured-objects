import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const viteConfig = defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			formats: ["es"],
			fileName: "index",
		},
		rollupOptions: {
			output: {
				preserveModules: true,
				entryFileNames: "[name].js",
			},
		},
	},
	plugins: [
		dts({
			include: ["src"],
		}),
	],
});

export default viteConfig;
