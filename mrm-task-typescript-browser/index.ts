import { json, packageJson, install } from "mrm-core";

const packages = ["typescript", "@types/node"];

function task() {
  json("tsconfig.json")
    .merge({
      compilerOptions: {
        outDir: `./dist`,

        target: "es5",

        moduleResolution: "node",

        strict: true,
        noUnusedLocals: true,

        experimentalDecorators: true,
        emitDecoratorMetadata: true,

        pretty: true,
        sourceMap: true,
      },
      include: ["./src/**/*"],
      exclude: ["./node_modules"],
    })
    .save();

  packageJson().set("main", `dist/index.js`).save();

  install(packages);
}
task.description = "Add TypeScript for browser";

module.exports = task;
