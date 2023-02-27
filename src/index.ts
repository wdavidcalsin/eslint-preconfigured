import { execFile, execSync } from "child_process";
import { existsSync, writeFileSync } from "fs";
import * as fs from "fs-extra";

const CONFIG_FILE_NAME = ".eslintrc.json";

// Defines the configuration to be written to the file.
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
  // Defines the path where the file will be written.
  let configFilePath = "";

  configFilePath = `${process.env.HOME}/${CONFIG_FILE_NAME}`;

  // Check if a configuration file already exists
  if (existsSync(configFilePath)) {
    console.log("ESLint configuration file already exists.");
    return;
  } else {
    // Write the configuration file
    writeFileSync(configFilePath, JSON.stringify(eslintConfig, null, 2));
    console.log(`ESLint configuration file created in ${configFilePath}.`);
  }
}

export function helpInstall() {
  // Install ESLint and necessary dependencies
  const packageManager = process.platform === "win32" ? "npm.cmd" : "npm";
  execSync(
    `${packageManager} install --save-dev eslint eslint-config-prettier eslint-config-standard-with-typescript eslint-plugin-import eslint-plugin-n eslint-plugin-promise eslint-plugin-react prettier prettier-eslint`
  );
}

export function installPackage() {
  execFile("../settings.cmd", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

export async function addScriptToPackageJson() {
  // Read the current content of package.json
  const packageJson = await fs.readJson("package.json");

  // Add the "lint" script to the scripts object in package.json
  packageJson.scripts = {
    ...packageJson.scripts,
    lint: 'eslint "*/**/*.{js,ts,tsx}" --fix',
    prettier:
      'prettier --ignore-path .gitignore "**/*.{js,json,ts,tsx,scss,css,md}"',
    format: "pnpm run prettier --write",
  };

  // Write the modified content back to package.json
  await fs.writeJson("package.json", packageJson, { spaces: 2 });
}
