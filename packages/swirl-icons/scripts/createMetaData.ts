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

const idPrefix = "swirl-icons-";

const iconSet = new Set<string>();

fs.readdirSync("icons").forEach((file) => {
  iconSet.add(file.substring(0, file.length - 6));
});

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
