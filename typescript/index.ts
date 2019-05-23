import { json, packageJson, install } from "mrm-core";

const packages = ["typescript", "@types/node"];

function task() {
  json("tsconfig.json")
    .merge({
      compilerOptions: {
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
    .save();

  install(packages);
}
task.description = "Add TypeScript";

module.exports = task;
