"use strict";
exports.__esModule = true;
exports.dependencyPackagesToInstall = exports.prettierConfig = exports.eslintConfigIgnore = exports.eslintConfig = exports.CONFIG_FILE_NAME_PRETTIER = exports.CONFIG_FILE_NAME_ESLINT_IGNORE = exports.CONFIG_FILE_NAME_ESLINT = void 0;
exports.CONFIG_FILE_NAME_ESLINT = ".eslintrc.json";
exports.CONFIG_FILE_NAME_ESLINT_IGNORE = ".eslintignore";
exports.CONFIG_FILE_NAME_PRETTIER = ".prettierrc";
exports.eslintConfig = {
    env: {
        browser: true,
        es2021: true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "standard-with-typescript",
        "prettier",
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
exports.eslintConfigIgnore = "\n package.json \n\n yarn.lock\n\n pnpm-lock.yaml\n\n node_modules\n\n dist";
exports.prettierConfig = {
    trailingComma: "es5",
    tabWidth: 2,
    semi: true,
    singleQuote: true
};
exports.dependencyPackagesToInstall = [
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
    },
];
