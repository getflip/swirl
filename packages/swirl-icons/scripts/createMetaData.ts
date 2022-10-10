import fs from "fs";

const descriptionPlaceHolder =
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam";

type Usage = "app" | "admin";

type MetaData = {
  id: string;
  name: string;
  description: string;
  usage: Usage[];
  keywords: string[];
};

type metaDataObject = {
  [key: string]: MetaData;
};

const metadata: metaDataObject = {};

console.log("pwd", process.cwd());
const file = fs.readFileSync("dist/swirl-icons.css", "utf-8");

const iconSet = new Set(
  file
    .split("\n")
    .filter((line) => line.includes(".swirl-icons-"))
    .map((line) =>
      line
        .split(":before")[0]
        .replace(".", "")
        .replace("swirl-icons-", "")
        .slice(0, -2)
    )
);

const idPrefix = "swirl-icons-";

for (let icon of iconSet) {
  metadata[icon] = {
    id: idPrefix + icon,
    name: icon,
    description: descriptionPlaceHolder,
    usage: ["app", "admin"],
    keywords: [icon],
  };
}

fs.writeFileSync(
  "dist/metadata.js",
  `"use strict";\n
  const metadata = ${JSON.stringify(metadata, null, 2)}
  \n
  module.exports = metadata;`
);

console.log("🚀 metadata.js created 🚀");
