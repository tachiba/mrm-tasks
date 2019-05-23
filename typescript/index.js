// SEE: https://github.com/sapegin/mrm-tasks/tree/master/packages/mrm-task-typescript

const { json, packageJson, install } = require('mrm-core');

const packages = ['typescript'];

function task() {
  // tsconfig.json
  json('tsconfig.json')
    .merge({
      compilerOptions: {
        target: 'es2017',
        lib: ["esnext", "es2017"],

        module: 'commonjs',
        moduleResolution: 'node',

        strict: true,
        noUnusedLocals: true,

        experimentalDecorators: true,
        emitDecoratorMetadata: true,

        pretty: true,
      },
    })
    .save();

  // package.json
  packageJson()
    .appendScript('pretest', 'tsc --noEmit')
    .save();

  // Dependencies
  install(packages);
}
task.description = 'Add TypeScript';

module.exports = task;
