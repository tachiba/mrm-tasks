"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const packages = ["typescript", "@types/node"];
function task() {
    mrm_core_1.json("tsconfig.json")
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
    mrm_core_1.packageJson()
        .appendScript("pretest", "tsc --noEmit")
        .save();
    mrm_core_1.install(packages);
}
task.description = "Add TypeScript";
module.exports = task;
