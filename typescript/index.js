"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const packages = ["typescript", "@types/node"];
function task(config) {
    const configValues = config.values();
    const outDir = configValues.typescriptOutDir || "dist";
    mrm_core_1.json("tsconfig.json")
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
            pretty: true,
        },
        include: [
            "./src/**/*"
        ]
    })
        .save();
    mrm_core_1.packageJson()
        .appendScript("pretest", "tsc --noEmit")
        .set("main", `${outDir}/index.js`)
        .save();
    mrm_core_1.install(packages);
}
task.description = "Add TypeScript";
module.exports = task;
