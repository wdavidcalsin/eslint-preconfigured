import { exec } from "child_process";
import { existsSync, writeFileSync } from "fs";
import * as fs from "fs-extra";
import { resolve } from "path";
import {
  CONFIG_FILE_NAME_ESLINT,
  CONFIG_FILE_NAME_ESLINT_IGNORE,
  CONFIG_FILE_NAME_PRETTIER,
  eslintConfig,
  eslintConfigIgnore,
  isNpm,
  isPnpm,
  isYarn,
  prettierConfig,
} from "./constants";
import { IDependencies } from "./types/types-package";

function ensureFileExists(fileName: string, contentFile: string) {
  const fileNameResolve = resolve(process.cwd(), ".", fileName);

  if (existsSync(fileNameResolve)) {
    console.log("ESLint configuration file already exists.");
  } else {
    writeFileSync(fileNameResolve, contentFile);
    console.log(`ESLint configuration file created in ${fileNameResolve}.`);
  }
}

export function createConfigurationFile() {
  ensureFileExists(
    CONFIG_FILE_NAME_ESLINT,
    JSON.stringify(eslintConfig, null, 2)
  );

  ensureFileExists(CONFIG_FILE_NAME_ESLINT_IGNORE, eslintConfigIgnore);

  ensureFileExists(
    CONFIG_FILE_NAME_PRETTIER,
    JSON.stringify(prettierConfig, null, 2)
  );
}

export async function addScriptToPackageJson() {
  const packageJson = await fs.readJson("package.json");

  packageJson.scripts = {
    ...packageJson.scripts,
    lint: 'eslint "*/**/*.{js,jsx,ts,tsx}" --fix',
    prettier:
      'prettier --ignore-path .gitignore "**/*.{js,json,ts,tsx,scss,css,md}"',
    format: "pnpm run prettier --write",
  };

  await fs.writeJson("package.json", packageJson, { spaces: 2 });
}

function packageManager() {
  if (isNpm && isYarn) {
    return "yarn add ";
  } else if (isNpm && isPnpm) {
    return "pnpm install ";
  } else {
    return "npm install ";
  }
}

function getInstalledDependencies(): Record<string, string> {
  const packageJson = JSON.parse(fs.readFileSync("./package.json").toString());
  return { ...packageJson.dependencies, ...packageJson.devDependencies };
}

export function ensureDependencies(dependencies: IDependencies[]) {
  return new Promise<void>((resolve, reject) => {
    const missingDependencies: IDependencies[] = [];

    for (const dependency of dependencies) {
      if (!(dependency.name in getInstalledDependencies())) {
        missingDependencies.push(dependency);
      }
    }

    if (missingDependencies.length === 0) {
      resolve();
      return;
    }

    const installCommands = missingDependencies
      .map((dep) => `${packageManager()} ${dep.name} ${dep.typeDependencies}`)
      .join(" && ");

    console.log("Is command line: ", installCommands);

    exec(installCommands, (err) => {
      if (err) {
        reject(new Error(`Failed to install dependencies: ${err.message}`));
      } else {
        resolve();
      }
    });
  });
}
