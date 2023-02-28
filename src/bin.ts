#!/usr/bin/env node

import { textSync } from "figlet";
import {
  addScriptToPackageJson,
  createConfigurationFile,
  ensureDependencies,
} from ".";
import {
  dependencyPackagesToInstall,
  isNpm,
  isPnpm,
  isYarn,
} from "./constants";

try {
  console.log(textSync("Eslint Config"));

  console.table({ isNpm, isYarn, isPnpm });

  createConfigurationFile();

  addScriptToPackageJson();

  console.log("Installing dependencies...");

  ensureDependencies(dependencyPackagesToInstall)
    .then(() => {
      console.log("ESLint and the necessary dependencies have been installed.");
    })
    .catch((error) => {
      console.error(error);
    });
} catch (e) {
  console.error(e instanceof Error ? `eslint - ${e.message}` : e);

  process.exit(1);
}
