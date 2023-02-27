"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ensureDependencies = exports.addScriptToPackageJson = exports.createConfigurationFile = void 0;
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var fs = require("fs-extra");
var path_1 = require("path");
var constants_1 = require("./constants");
function isFileOrCreate(fileName, contentFile) {
    var fileNameResolve = (0, path_1.resolve)(process.cwd(), ".", fileName);
    if ((0, fs_1.existsSync)(fileNameResolve)) {
        console.log("ESLint configuration file already exists.");
    }
    else {
        (0, fs_1.writeFileSync)(fileNameResolve, contentFile);
        console.log("ESLint configuration file created in ".concat(fileNameResolve, "."));
    }
}
function createConfigurationFile() {
    isFileOrCreate(constants_1.CONFIG_FILE_NAME_ESLINT, JSON.stringify(constants_1.eslintConfig, null, 2));
    isFileOrCreate(constants_1.CONFIG_FILE_NAME_ESLINT_IGNORE, constants_1.eslintConfigIgnore);
    isFileOrCreate(constants_1.CONFIG_FILE_NAME_PRETTIER, JSON.stringify(constants_1.prettierConfig, null, 2));
}
exports.createConfigurationFile = createConfigurationFile;
function addScriptToPackageJson() {
    return __awaiter(this, void 0, void 0, function () {
        var packageJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fs.readJson("package.json")];
                case 1:
                    packageJson = _a.sent();
                    packageJson.scripts = __assign(__assign({}, packageJson.scripts), { lint: 'eslint "*/**/*.{js,jsx,ts,tsx}" --fix', prettier: 'prettier --ignore-path .gitignore "**/*.{js,json,ts,tsx,scss,css,md}"', format: "pnpm run prettier --write" });
                    return [4, fs.writeJson("package.json", packageJson, { spaces: 2 })];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    });
}
exports.addScriptToPackageJson = addScriptToPackageJson;
function ensureDependencies(dependencies) {
    var _this = this;
    return new Promise(function (res) {
        try {
            for (var _i = 0, dependencies_1 = dependencies; _i < dependencies_1.length; _i++) {
                var dependency = dependencies_1[_i];
                require(dependency.name);
            }
            res();
        }
        catch (e) {
            var dependenciesToInstall_1 = dependencies
                .filter(function (dependency) {
                try {
                    require(dependency.name);
                    return false;
                }
                catch (_a) {
                    return true;
                }
            })
                .map(function (dependency) {
                console.log("Installing eslint dependencies...");
                return "npm i ".concat(dependency.name, " ").concat(dependency.typeDependencies);
            })
                .join(" && ");
            (0, child_process_1.exec)(dependenciesToInstall_1, function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log(dependenciesToInstall_1);
                    res();
                    return [2];
                });
            }); });
        }
    });
}
exports.ensureDependencies = ensureDependencies;
