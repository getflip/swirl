#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { ErrorCodeGenerator, CodeGeneratorFactory } from ".";

yargs(hideBin(process.argv)).command(
  "generate",
  "Generate error codes",
  (yargs) => {
    return yargs
      .option("source-path", {
        alias: "s",
        type: "string",
        description: "Path to the source file",
      })
      .option("output-path", {
        alias: "o",
        type: "string",
        description: "Path to the output file",
      });
  },
  (argv) => {
    console.log("Source path: ", argv["source-path"]);
    console.log("Output path: ", argv["output-path"]);
    console.log("Generating error codes...");

    if (
      typeof argv["source-path"] === "string" &&
      typeof argv["output-path"] === "string"
    ) {
      new ErrorCodeGenerator([
        CodeGeneratorFactory.createGenerator("TypeScript"),
      ])
        .setSourcePath(argv["source-path"])
        .setOutputDirectory(argv["output-path"])
        .generate();

      console.log("Done!");
    } else {
      throw new Error("Invalid arguments");
    }
  },
).argv;
