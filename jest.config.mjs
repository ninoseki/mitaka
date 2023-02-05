import { createRequire } from "module";
import { pathsToModuleNameMapper } from "ts-jest";

const require = createRequire(import.meta.url);
const tsconfig = require("./tsconfig.json");

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */

const config = {
  setupFiles: ["jest-webextension-mock"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testRegex: ["^.+\\.spec.tsx?$"],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.ts?$": ["ts-jest", { isolatedModules: true, useESM: true }],
  },
};

export default config;
