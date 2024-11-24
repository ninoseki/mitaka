// @ts-check
import eslint from "@eslint/js";
import neverthrow from "@ninoseki/eslint-plugin-neverthrow";
import vitest from "@vitest/eslint-plugin";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import * as regexpPlugin from "eslint-plugin-regexp";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import simpleImportSort from "eslint-plugin-simple-import-sort";

// eslint-disable-next-line no-undef
const mode = process.env.NODE_ENV === "production" ? "error" : "warn";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  ...vueTsEslintConfig(),
  regexpPlugin.configs["flat/recommended"],
  {
    plugins: { neverthrow, "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": mode,
      "simple-import-sort/exports": mode,
      "neverthrow/must-use-result": "error",
      "no-console": mode,
      "no-debugger": mode,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: "module",
        project: "./tsconfig.json",
        extraFileExtensions: [".vue"],
      },
    },
  },
  {
    files: ["tests/**"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  }
);
