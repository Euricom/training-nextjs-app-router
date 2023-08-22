/* eslint-disable arrow-body-style */
import react from "@vitejs/plugin-react";
import { join } from "path";
import { defineConfig } from "vite";

const srcRoot = join(__dirname, "src");

// More config, see: https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": srcRoot,
      },
    },
    test: {
      environment: "jsdom",
      include: ["**/*.spec.{ts,tsx}"],
      setupFiles: ["./src/tests/setup.ts"],
    },
  };
});
