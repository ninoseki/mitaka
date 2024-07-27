/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

const mode = process.env.NODE_ENV === "production" ? "error" : "warn";

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
    "plugin:regexp/recommended",
  ],
  rules: {
    "no-console": mode,
    "no-debugger": mode,
  },
};
