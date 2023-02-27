#!/usr/bin/env node
import {
  addScriptToPackageJson,
  createEslintrc,
  installPackage,
  executionsPermissions,
} from ".";

// Run CLI
try {
  // Run command or show usage for unknown command
  createEslintrc();
  addScriptToPackageJson();
  executionsPermissions();
  installPackage();
  console.log("ESLint and the necessary dependencies have been installed.");
} catch (e) {
  console.error(e instanceof Error ? `eslint - ${e.message}` : e);
  process.exit(1);
}
