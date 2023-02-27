#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var _1 = require(".");
try {
    (0, _1.createEslintrc)();
    (0, _1.addScriptToPackageJson)();
    (0, _1.installPackage)();
    console.log("ESLint and the necessary dependencies have been installed.");
}
catch (e) {
    console.error(e instanceof Error ? "eslint - ".concat(e.message) : e);
    process.exit(1);
}
