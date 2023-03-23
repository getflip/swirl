import path from "path";
import fs from "fs";
import OASBuilder, { Operations } from "./OASBuilder";
import Oas from "oas";

type ApiDoc = {
  title: string;
  path: string;
  oas: Oas;
  operations?: Operations;
};

let docs: ApiDoc[] = [];

const specPath = path.resolve(`${process.cwd()}/specs`);
const specs = fs
  .readdirSync(`${specPath}`)
  .filter((spec) => spec.includes(".yml") || spec.includes(".yaml"))
  .map((spec) => `${specPath}/${spec}`);

async function generateApiDoc(specPath: string) {
  const oasBuilder = await new OASBuilder(specPath).parseOAS();
  oasBuilder.setTitleAndPath().setDescription().setPaths().setOperations();

  // todo: logic to create navigationlinks in the lib.
  //

  docs.push({
    title: oasBuilder.title,
    oas: oasBuilder.oas,
    path: oasBuilder.path,
    operations: oasBuilder.operations,
  });
}

async function generateMdxForApiDocs() {
  for (const spec of specs) {
    await generateApiDoc(spec);
  }

  console.log(docs);
}

generateMdxForApiDocs();
