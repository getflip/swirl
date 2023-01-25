const { readFileSync, writeFileSync } = require("fs");
const { dirname, resolve } = require("path");

const package = require("../package.json");
const pubspecPath = resolve(__dirname, "../dart/pubspec.yaml");

const pubspecWithUpdatedVersion = readFileSync(pubspecPath)
  .toString()
  .replace(/version: "(\d+\.\d+\.\d+)"/, `version: "${package.version}"`);

writeFileSync(pubspecPath, pubspecWithUpdatedVersion);
