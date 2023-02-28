type typeDependencies = "--save" | "--save-dev";
interface IDependencies {
    name: string;
    typeDependencies: typeDependencies;
}

declare function createConfigurationFile(): void;
declare function addScriptToPackageJson(): Promise<void>;
declare function ensureDependencies(dependencies: IDependencies[]): Promise<void>;

export { addScriptToPackageJson, createConfigurationFile, ensureDependencies };
