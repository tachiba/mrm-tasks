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

        target: "es2017",
        lib: ["esnext", "es2017"],

        module: "commonjs",
        moduleResolution: "node",

        strict: true,
        noUnusedLocals: true,

        experimentalDecorators: true,
        emitDecoratorMetadata: true,

        pretty: true
      }
    })
    .save();

  packageJson()
    .appendScript("pretest", "tsc --noEmit")
    .set("main", `${outDir}/index.js`)
    .save();

  install(packages);
}
task.description = "Add TypeScript";

module.exports = task;
