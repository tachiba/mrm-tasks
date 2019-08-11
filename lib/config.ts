interface Config {
  values(): ConfigValues;
}

interface ConfigValues {
  typescriptOutDir: string | undefined;

  eslintRules: any;

  env: string | undefined;

  node: boolean | undefined;
}

export { ConfigValues, Config };
