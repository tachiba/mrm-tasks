interface Config {
  values(): ConfigValues;
}

interface ConfigValues {
  typescriptOutDir: string | undefined;

  eslintRules: any;

  env: string | undefined;
}

export { ConfigValues, Config };
