#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var figlet_1 = require("figlet");
var _1 = require(".");
var constants_1 = require("./constants");
try {
    console.log((0, figlet_1.textSync)("Eslint Config"));
    (0, _1.createConfigurationFile)();
    (0, _1.addScriptToPackageJson)();
    (0, _1.ensureDependencies)(constants_1.dependencyPackagesToInstall);
    console.log("ESLint and the necessary dependencies have been installed.");
}
catch (e) {
    console.error(e instanceof Error ? "eslint - ".concat(e.message) : e);
    process.exit(1);
}
