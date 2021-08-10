import { json, packageJson, install } from "mrm-core";

const packages = ["typescript", "@types/node"];

function task() {
  json("tsconfig.json")
    .merge({
      compilerOptions: {
        outDir: `./dist`,

        // https://github.com/tsconfig/bases/blob/main/bases/node14.json
        target: "es2020",
        // You may need to add "dom" if it runs browser tests
        lib: ["ES2020"],
        module: "commonjs",

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
task.description = "Add TypeScript for node.js";

module.exports = task;
