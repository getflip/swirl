module.exports = {
  extends: ["plugin:@stencil/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@stencil/decorators-context": "off",
    "@stencil/dependency-suggestions": "off",
    "@stencil/no-unused-watch": "off",
    "@stencil/own-methods-must-be-private": "off",
  },
};
