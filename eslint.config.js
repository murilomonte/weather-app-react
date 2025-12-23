import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  reactHooks.configs.flat.recommended,
  globalIgnores(["dist"]),
  {
    env: {
      browser: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: ["react-refresh"],
    rules: {
      "react-refresh/only-export-components": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unsafe-finally": "off",
      "no-unused-vars": "off",
      "react/jsx-key": "off",
    },
  },
]);