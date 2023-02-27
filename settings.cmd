@echo off

pnpm install --save-dev eslint

pnpm install --save-dev eslint-config-prettier

pnpm install --save-dev eslint-config-standard-with-typescript

pnpm install --save-dev eslint-plugin-import

pnpm install --save-dev eslint-plugin-n

pnpm install --save-dev eslint-plugin-promise

pnpm install --save-dev eslint-plugin-react

pnpm install --save-dev prettier

pnpm install --save-dev prettier-eslint


echo {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "standard-with-typescript",
    "prettier"
  ],
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "plugins": ["react"],
  "rules": {
    "semi": ["warn", "always"],
    "quotes": ["warn", "single"],
    "indent": "error",
    "@typescript-eslint/explicit-function-return-type": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-uses-react": "warn",
    "@typescript-eslint/triple-slash-reference": 0
  }
} > .eslintrc.json

echo package.json
yarn.lock
pnpm-lock.yaml
node_modules
dist > .eslintignore

echo {
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
} > .prettierrc


:: Add the "lint", "prettier", and "format" commands to package.json.
powershell -Command "(Get-Content package.json -Raw) -replace '\"scripts\": {', '\"scripts\": {`n    \"lint\": \"eslint \\"src/**/*.{js,ts,tsx}\\" --fix\",`n    \"prettier\": \"prettier --ignore-path .gitignore \\"**/*.{js,json,ts,tsx,scss,css,md}\\"",`n    \"format\": \"pnpm run prettier --write\",' | Set-Content package.json"

:: Verify that the commands have been added.
findstr /C:"\"lint\": \"eslint" package.json >nul && findstr /C:"\"prettier\": \"prettier" package.json >nul && findstr /C:"\"format\": \"pnpm" package.json >nul
if %errorlevel% equ 0 (
    echo "The lint, prettier, and format commands have been added to the package.json file."
) else (
    echo "The lint, prettier, and format commands could not be added to the package.json file."
)