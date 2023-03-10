#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/bin.ts
var import_figlet = require("figlet");

// src/index.ts
var import_child_process = require("child_process");
var import_fs = require("fs");
var fs2 = __toESM(require("fs-extra"));
var import_path = require("path");

// src/constants/eslint-prettier.ts
var fs = __toESM(require("fs-extra"));
var CONFIG_FILE_NAME_ESLINT = ".eslintrc.json";
var CONFIG_FILE_NAME_ESLINT_IGNORE = ".eslintignore";
var CONFIG_FILE_NAME_PRETTIER = ".prettierrc";
var eslintConfig = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "standard-with-typescript",
    "prettier"
  ],
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  },
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json"
  },
  plugins: ["react"],
  rules: {
    semi: ["warn", "always"],
    quotes: ["warn", "single"],
    indent: "error",
    "@typescript-eslint/explicit-function-return-type": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-uses-react": "warn",
    "@typescript-eslint/triple-slash-reference": 0
  }
};
var eslintConfigIgnore = `
 package.json 

 yarn.lock

 pnpm-lock.yaml

 node_modules

 dist`;
var prettierConfig = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: true
};
var dependencyPackagesToInstall = [
  {
    name: "@typescript-eslint/eslint-plugin",
    typeDependencies: "--save-dev"
  },
  {
    name: "@typescript-eslint/parser",
    typeDependencies: "--save-dev"
  },
  {
    name: "eslint",
    typeDependencies: "--save-dev"
  },
  {
    name: "eslint-config-prettier",
    typeDependencies: "--save-dev"
  },
  {
    name: "eslint-config-standard-with-typescript",
    typeDependencies: "--save-dev"
  },
  {
    name: "eslint-plugin-import",
    typeDependencies: "--save-dev"
  },
  {
    name: "eslint-plugin-n",
    typeDependencies: "--save-dev"
  },
  {
    name: "eslint-plugin-promise",
    typeDependencies: "--save-dev"
  },
  {
    name: "eslint-plugin-react",
    typeDependencies: "--save-dev"
  },
  {
    name: "prettier",
    typeDependencies: "--save-dev"
  },
  {
    name: "prettier-eslint",
    typeDependencies: "--save-dev"
  }
];
var PATH_NPM_FILE = "./package-lock.json";
var PATH_YARN_FILE = "./yarn.lock";
var PATH_PNPM_FILE = "./pnpm-lock.yaml";
var isNpm = fs.existsSync(PATH_NPM_FILE);
var isYarn = fs.existsSync(PATH_YARN_FILE);
var isPnpm = fs.existsSync(PATH_PNPM_FILE);

// src/index.ts
function ensureFileExists(fileName, contentFile) {
  const fileNameResolve = (0, import_path.resolve)(process.cwd(), ".", fileName);
  if ((0, import_fs.existsSync)(fileNameResolve)) {
    console.log("ESLint configuration file already exists.");
  } else {
    (0, import_fs.writeFileSync)(fileNameResolve, contentFile);
    console.log(`ESLint configuration file created in ${fileNameResolve}.`);
  }
}
function createConfigurationFile() {
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
async function addScriptToPackageJson() {
  const packageJson = await fs2.readJson("package.json");
  packageJson.scripts = {
    ...packageJson.scripts,
    lint: 'eslint "*/**/*.{js,jsx,ts,tsx}" --fix',
    prettier: 'prettier --ignore-path .gitignore "**/*.{js,json,ts,tsx,scss,css,md}"',
    format: "pnpm run prettier --write"
  };
  await fs2.writeJson("package.json", packageJson, { spaces: 2 });
}
function packageManager() {
  if (isYarn) {
    return "yarn add ";
  } else if (isPnpm) {
    return "pnpm install ";
  } else if (isNpm) {
    return "npm install ";
  } else {
    return "npm install ";
  }
}
function getInstalledDependencies() {
  const packageJson = JSON.parse(fs2.readFileSync("./package.json").toString());
  return { ...packageJson.dependencies, ...packageJson.devDependencies };
}
function ensureDependencies(dependencies) {
  return new Promise((resolve2, reject) => {
    const missingDependencies = [];
    for (const dependency of dependencies) {
      if (!(dependency.name in getInstalledDependencies())) {
        missingDependencies.push(dependency);
      }
    }
    if (missingDependencies.length === 0) {
      resolve2();
      return;
    }
    const installCommands = missingDependencies.map((dep) => `${packageManager()} ${dep.name} ${dep.typeDependencies}`).join(" && ");
    (0, import_child_process.exec)(installCommands, (err) => {
      if (err) {
        reject(new Error(`Failed to install dependencies: ${err.message}`));
      } else {
        resolve2();
      }
    });
  });
}

// src/bin.ts
try {
  console.log((0, import_figlet.textSync)("Eslint Config"));
  console.table({ isNpm, isYarn, isPnpm });
  createConfigurationFile();
  addScriptToPackageJson();
  console.log("Installing dependencies...");
  ensureDependencies(dependencyPackagesToInstall).then(() => {
    console.log("ESLint and the necessary dependencies have been installed.");
  }).catch((error) => {
    console.error(error);
  });
} catch (e) {
  console.error(e instanceof Error ? `eslint - ${e.message}` : e);
  process.exit(1);
}
