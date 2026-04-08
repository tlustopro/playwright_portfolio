// eslint.config.ts
import playwright from "eslint-plugin-playwright";

export default [
  {
    ...playwright.configs["flat/recommended"],
    files: ["src/tests/**"],
  },
];