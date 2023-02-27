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
  prettierConfig,
} from "./constants";
import { IDependencies } from "./types";

function isFileOrCreate(fileName: string, contentFile: string) {
  const fileNameResolve = resolve(process.cwd(), ".", fileName);

  if (existsSync(fileNameResolve)) {
    console.log("ESLint configuration file already exists.");
  } else {
    writeFileSync(fileNameResolve, contentFile);
    console.log(`ESLint configuration file created in ${fileNameResolve}.`);
  }
}

export function createConfigurationFile() {
  isFileOrCreate(
    CONFIG_FILE_NAME_ESLINT,
    JSON.stringify(eslintConfig, null, 2)
  );

  isFileOrCreate(CONFIG_FILE_NAME_ESLINT_IGNORE, eslintConfigIgnore);

  isFileOrCreate(
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

export function ensureDependencies(dependencies: IDependencies[]) {
  return new Promise<void>((res) => {
    try {
      for (let dependency of dependencies) {
        require(dependency.name);
      }
      res();
    } catch (e) {
      const dependenciesToInstall = dependencies
        .filter((dependency) => {
          try {
            require(dependency.name);
            return false;
          } catch {
            return true;
          }
        })
        .map((dependency) => {
          console.log("Installing eslint dependencies...");
          return `npm i ${dependency.name} ${dependency.typeDependencies}`;
        })
        .join(" && ");

      exec(dependenciesToInstall, async () => {
        console.log(dependenciesToInstall);
        res();
      });
    }
  });
}
