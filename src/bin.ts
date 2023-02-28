#!/usr/bin/env node

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
  console.table({ isNpm, isYarn, isPnpm });

  createConfigurationFile();

  addScriptToPackageJson();

  ensureDependencies(dependencyPackagesToInstall);

  console.log("ESLint and the necessary dependencies have been installed.");
} catch (e) {
  console.error(e instanceof Error ? `eslint - ${e.message}` : e);

  process.exit(1);
}
