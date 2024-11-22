import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";

import wxtConfig from "./wxt.config";

export default mergeConfig(
  wxtConfig,
  defineConfig({
    test: {
      globals: true,
      coverage: {
        reporter: ["lcov", "text"],
      },
    },
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  }),
);
