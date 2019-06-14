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
            target: "es5",
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
        ]
    })
        .save();
    mrm_core_1.packageJson()
        .appendScript("pretest", "tsc --noEmit")
        .set("main", `${outDir}/index.js`)
        .save();
    mrm_core_1.install(packages);
}
task.description = "Add TypeScript for browser";
module.exports = task;
