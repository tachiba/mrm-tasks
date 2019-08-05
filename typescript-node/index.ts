import { json, packageJson, install } from "mrm-core";
import { Config } from "../lib/config";

const packages = ["typescript", "@types/node"];

function task(config: Config) {
  const configValues = config.values();
  const outDir = configValues.typescriptOutDir || "dist";

  json("tsconfig.json")
    .merge({
      compilerOptions: {
        outDir: `./${outDir}`,

        // nodejs10
        target: "es2018",

        moduleResolution: "node",

        strict: true,
        noUnusedLocals: true,

        experimentalDecorators: true,
        emitDecoratorMetadata: true,

        pretty: true,
        sourceMap: true
      },
      include: [
        "./src/**/*"
      ],
      exclude: [
        "./node_modules"
      ]
    })
    .save();

  packageJson()
    .set("main", `${outDir}/index.js`)
    .save();

  install(packages);
}
task.description = "Add TypeScript for nodejs10";

module.exports = task;
