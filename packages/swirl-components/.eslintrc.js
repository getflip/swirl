module.exports = {
  extends: ["plugin:@stencil/recommended"],
  ignorePatterns: ["stencil.config.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@stencil/decorators-context": "off",
    "@stencil/dependency-suggestions": "off",
    "@stencil/no-unused-watch": "off",
    "@stencil/strict-boolean-conditions": "off",
  },
};
