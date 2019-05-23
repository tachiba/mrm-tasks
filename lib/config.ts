interface Config {
  values(): ConfigValues;
}

interface ConfigValues {
  typescriptOutDir: string | undefined;

  eslintRules: any;
}

export { ConfigValues, Config };
