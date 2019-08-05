"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const packages = ["jest", "ts-jest", "@types/jest"];
function task(config) {
    const configValues = config.values();
    const outDir = configValues.typescriptOutDir || "dist";
    // package.json
    const pkg = mrm_core_1.packageJson().merge({
        scripts: {
            "test:jest": "jest",
            "test:watch": "jest --watch",
            "test:coverage": "jest --coverage"
        },
        jest: {
            clearMocks: true,
            globals: {
                "ts-jest": {
                    tsConfig: "tsconfig.json"
                }
            },
            moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
            preset: "ts-jest/presets/default",
            testEnvironment: configValues.node ? "node" : undefined,
            testMatch: ["**/__tests__/*.+(ts|tsx|js|jsx)"],
            testPathIgnorePatterns: ["/node_modules/", `<rootDir>/${outDir}/`],
            transform: {
                "^.+\\.tsx?$": "ts-jest"
            }
        }
    });
    pkg.appendScript("test", "npm run test:jest");
    // TODO Babel Implement later
    // TODO React Implement later
    pkg.save();
    mrm_core_1.json("tsconfig.json").merge({
        exclude: ["**/__tests__/*"]
    });
    if (!pkg.get("private")) {
        mrm_core_1.lines(".npmignore")
            .add("__tests__/")
            .save();
    }
    if (pkg.get(`devDependencies.eslint`)) {
        const eslintignore = mrm_core_1.lines(".eslintignore").add("coverage/*");
        eslintignore.save();
    }
    const jestConfig = mrm_core_1.file("jest.config.js");
    if (jestConfig.exists())
        jestConfig.delete();
    mrm_core_1.install(packages);
}
task.description = "Add Jest";
module.exports = task;
