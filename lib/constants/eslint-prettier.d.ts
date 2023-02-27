import { IDependencies } from "../types";
export declare const CONFIG_FILE_NAME_ESLINT = ".eslintrc.json";
export declare const CONFIG_FILE_NAME_ESLINT_IGNORE = ".eslintignore";
export declare const CONFIG_FILE_NAME_PRETTIER = ".prettierrc";
export declare const eslintConfig: {
    env: {
        browser: boolean;
        es2021: boolean;
    };
    extends: string[];
    settings: {
        react: {
            pragma: string;
            version: string;
        };
    };
    overrides: any[];
    parser: string;
    parserOptions: {
        ecmaVersion: string;
        sourceType: string;
        project: string;
    };
    plugins: string[];
    rules: {
        semi: string[];
        quotes: string[];
        indent: string;
        "@typescript-eslint/explicit-function-return-type": number;
        "react/react-in-jsx-scope": number;
        "react/jsx-uses-react": string;
        "@typescript-eslint/triple-slash-reference": number;
    };
};
export declare const eslintConfigIgnore = "\n package.json \n\n yarn.lock\n\n pnpm-lock.yaml\n\n node_modules\n\n dist";
export declare const prettierConfig: {
    trailingComma: string;
    tabWidth: number;
    semi: boolean;
    singleQuote: boolean;
};
export declare const dependencyPackagesToInstall: IDependencies[];
