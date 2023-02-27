#!/usr/bin/env node
import { textSync } from "figlet";

import {
  addScriptToPackageJson,
  createConfigurationFile,
  ensureDependencies,
} from ".";
import { dependencyPackagesToInstall } from "./constants";

try {
  console.log(textSync("Eslint Config"));

  createConfigurationFile();

  addScriptToPackageJson();

  ensureDependencies(dependencyPackagesToInstall);

  console.log("ESLint and the necessary dependencies have been installed.");
} catch (e) {
  console.error(e instanceof Error ? `eslint - ${e.message}` : e);

  process.exit(1);
}
