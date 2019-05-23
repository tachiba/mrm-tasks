interface Config {
  values(): ConfigValues;
}

interface ConfigValues {
  typescriptOutDir: string | undefined;

  eslintRules: any;

  node: boolean | undefined;
}

export { ConfigValues, Config };
