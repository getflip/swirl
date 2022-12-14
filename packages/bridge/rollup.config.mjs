import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: "./dist/index.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "./dist/index.mjs",
      format: "es",
      sourcemap: true,
    },
  ],
  external: ["uuid"],
  plugins: [typescript()],
};
