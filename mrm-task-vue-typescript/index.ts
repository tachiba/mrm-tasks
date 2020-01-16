import { copyFiles, install, json, packageJson } from "mrm-core";

const packages = ["vue"];
const devPackages = [
  // https://vue-loader.vuejs.org/guide/
  "vue-loader",
  "vue-template-compiler",

  // https://eslint.vuejs.org
  // https://github.com/typescript-eslint/typescript-eslint/issues/404
  // https://github.com/vuejs/eslint-plugin-vue/issues/811#issuecomment-467753982
  "eslint-plugin-vue",
  "@vue/eslint-config-prettier",
  // https://github.com/vuejs/eslint-config-typescript/tree/master#usage
  "@vue/eslint-config-typescript",

  // TODO Jest Integration
  // https://vue-test-utils.vuejs.org/guides/using-with-typescript.html
  // "@vue/test-utils",
  "vue-jest"
];
const TYPESCRIPT_VUE_SHIMS = "vue-shims.d.ts";

function task() {
  copyFiles(__dirname, [TYPESCRIPT_VUE_SHIMS]);

  install(packages, { dev: false });
  install(devPackages);

  // TODO Add these into webpack.config.js
  // rules: [
  //   {
  //     test: /\.vue$/,
  //     loader: 'vue-loader'
  //   },
  //   {
  //     test: /\.tsx?$/,
  //     exclude: /node_modules/,
  //     use: [
  //     {
  //       loader: "ts-loader",
  //       options: {
  //         appendTsSuffixTo: [/\.vue$/],
  //       }
  //     }
  //   ]
  // ]
  //
  // plugins: [
  //   new VueLoaderPlugin()
  // ]
  //
  // resolve: {
  //     extensions: ['.ts', '.js', '.vue', '.json'],
  // }

  // eslint
  const eslintrc = json(".eslintrc.json");
  const eslintrcBody = eslintrc.get();
  ["plugin:vue/recommended", "@vue/prettier", "@vue/typescript"].forEach(
    (newExtend): void => {
      if (eslintrcBody.extends.includes(newExtend)) return;
      eslintrcBody.extends.push(newExtend);
    }
  );
  eslintrc
    .merge({
      extends: eslintrcBody.extends
    })
    .save();

  const packageJSON = packageJson();
  const packageJSONBody = packageJSON.get();

  // lint-staged
  packageJSON.set("lint-staged", {
    ...packageJSONBody["lint-staged"],
    "*.vue": ["eslint --fix"]
  });

  // TODO Jest Integration
  // if (!packageJSONBody.jest.moduleFileExtensions.includes("vue")) {
  //   packageJSONBody.jest.moduleFileExtensions.push("vue");
  // }
  // packageJSON.set("jest", {
  //   ...packageJSONBody.jest,
  //   globals: {
  //     ...packageJSONBody.jest.globals,
  //     "vue-jest": {
  //       babelConfig: false
  //     }
  //   },
  //   testEnvironment: "jsdom",
  //   moduleFileExtensions: packageJSONBody.jest.moduleFileExtensions,
  //   transform: {
  //     ...packageJSONBody.jest.transform,
  //     ".*\\.(vue)$": "vue-jest"
  //   }
  // });

  // https://vue-loader.vuejs.org/guide/
  packageJSON.unset("side-effect");

  packageJSON.save();
}

task.description = "Add Vue";

module.exports = task;
