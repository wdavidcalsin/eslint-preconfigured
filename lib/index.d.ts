import { IDependencies } from "./types";
export declare function createConfigurationFile(): void;
export declare function addScriptToPackageJson(): Promise<void>;
export declare function ensureDependencies(dependencies: IDependencies[]): Promise<void>;
