import { exec } from "child_process";
import { existsSync, writeFileSync } from "fs";
import * as fs from "fs-extra";
import { resolve } from "path";

const CONFIG_FILE_NAME = ".eslintrc.json";

const eslintConfig = {
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

export function createEslintrc() {
  let configFilePath = "";

  configFilePath = resolve(process.cwd(), ".", CONFIG_FILE_NAME);

  if (existsSync(configFilePath)) {
    console.log("ESLint configuration file already exists.");
  } else {
    writeFileSync(configFilePath, JSON.stringify(eslintConfig, null, 2));

    console.log(`ESLint configuration file created in ${configFilePath}.`);
  }
}

export function installPackage(callback: () => void) {
  exec("npm install eslint", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr output: ${stderr}`);
      return;
    }
    console.log(`Command executed successfully: ${stdout}`);
    callback();
  });
}

export async function addScriptToPackageJson() {
  const packageJson = await fs.readJson("package.json");

  packageJson.scripts = {
    ...packageJson.scripts,
    lint: 'eslint "*/**/*.{js,ts,tsx}" --fix',
    prettier:
      'prettier --ignore-path .gitignore "**/*.{js,json,ts,tsx,scss,css,md}"',
    format: "pnpm run prettier --write",
  };

  await fs.writeJson("package.json", packageJson, { spaces: 2 });
}
