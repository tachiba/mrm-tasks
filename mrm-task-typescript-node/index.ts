import { json, packageJson, install } from "mrm-core";

const packages = ["typescript", "@types/node"];

function task(config: { values: () => { typescriptOutDir?: string } }) {
  const configValues = config.values();
  const outDir = configValues.typescriptOutDir || "dist";

  json("tsconfig.json")
    .merge({
      compilerOptions: {
        outDir: `./${outDir}`,

        // node.js 12
        target: "es2019",

        moduleResolution: "node",

        strict: true,
        noUnusedLocals: true,

        experimentalDecorators: true,
        emitDecoratorMetadata: true,

        pretty: true,
        sourceMap: true
      },
      include: ["./src/**/*"],
      exclude: ["./node_modules"]
    })
    .save();

  packageJson()
    .set("main", `${outDir}/index.js`)
    .save();

  install(packages);
}
task.description = "Add TypeScript for node.js";

module.exports = task;
