import { IDependencies } from "../types";
import * as fs from "fs-extra";

export const CONFIG_FILE_NAME_ESLINT = ".eslintrc.json";
export const CONFIG_FILE_NAME_ESLINT_IGNORE = ".eslintignore";
export const CONFIG_FILE_NAME_PRETTIER = ".prettierrc";

export const eslintConfig = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "standard-with-typescript",
    "prettier",
  ],
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react"],
  rules: {
    semi: ["warn", "always"],
    quotes: ["warn", "single"],
    indent: "error",
    "@typescript-eslint/explicit-function-return-type": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-uses-react": "warn",
    "@typescript-eslint/triple-slash-reference": 0,
  },
};

export const eslintConfigIgnore = `\n package.json 
\n yarn.lock
\n pnpm-lock.yaml
\n node_modules
\n dist`;

export const prettierConfig = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: true,
};

export const dependencyPackagesToInstall: IDependencies[] = [
  {
    name: "@typescript-eslint/eslint-plugin",
    typeDependencies: "--save-dev",
  },
  {
    name: "@typescript-eslint/parser",
    typeDependencies: "--save-dev",
  },
  {
    name: "eslint",
    typeDependencies: "--save-dev",
  },
  {
    name: "eslint-config-prettier",
    typeDependencies: "--save-dev",
  },
  {
    name: "eslint-config-standard-with-typescript",
    typeDependencies: "--save-dev",
  },
  {
    name: "eslint-plugin-import",
    typeDependencies: "--save-dev",
  },
  {
    name: "eslint-plugin-n",
    typeDependencies: "--save-dev",
  },
  {
    name: "eslint-plugin-promise",
    typeDependencies: "--save-dev",
  },
  {
    name: "eslint-plugin-react",
    typeDependencies: "--save-dev",
  },
  {
    name: "prettier",
    typeDependencies: "--save-dev",
  },
  {
    name: "prettier-eslint",
    typeDependencies: "--save-dev",
  },
];

const PATH_NPM_FILE = "./package-lock.json";
const PATH_YARN_FILE = "./yarn.lock";
const PATH_PNPM_FILE = "./pnpm-lock.yaml";

export const isNpm = fs.existsSync(PATH_NPM_FILE);
export const isYarn = fs.existsSync(PATH_YARN_FILE);
export const isPnpm = fs.existsSync(PATH_PNPM_FILE);
