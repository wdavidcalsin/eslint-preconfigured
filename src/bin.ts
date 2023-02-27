#!/usr/bin/env node
import { addScriptToPackageJson, createEslintrc, installPackage } from ".";

try {
  createEslintrc();
  addScriptToPackageJson();
  installPackage(() => {
    console.log("The package has been successfully installed!");
  });
  console.log("ESLint and the necessary dependencies have been installed.");
} catch (e) {
  console.error(e instanceof Error ? `eslint - ${e.message}` : e);
  process.exit(1);
}
