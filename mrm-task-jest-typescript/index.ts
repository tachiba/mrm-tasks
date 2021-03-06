import { lines, packageJson, install, file } from "mrm-core";

const packages = ["jest", "ts-jest", "@types/jest"];

function task(config: {
  values: () => { typescriptOutDir?: string; node?: boolean };
}) {
  const configValues = config.values();
  const outDir = configValues.typescriptOutDir || "dist";

  // package.json
  const pkg = packageJson().merge({
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

  if (!pkg.get("private")) {
    lines(".npmignore")
      .add("__tests__/")
      .save();
  }

  if (pkg.get(`devDependencies.eslint`)) {
    const eslintignore = lines(".eslintignore").add("coverage/*");

    eslintignore.save();
  }

  const jestConfig = file("jest.config.js");
  if (jestConfig.exists()) jestConfig.delete();

  install(packages);
}

task.description = "Add Jest";

module.exports = task;
