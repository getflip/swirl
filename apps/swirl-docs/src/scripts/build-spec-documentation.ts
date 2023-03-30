import OASBuilder from "@swirl/lib/docs/src/OasBuilder";
import { ApiDoc } from "@swirl/lib/docs";
import { API_SPEC_PATH } from "@swirl/lib/navigation";

let docs: ApiDoc[] = [];

async function generateApiDoc(specPath: string) {
  const oasBuilder = await new OASBuilder(specPath).parseOAS();
  oasBuilder.setTitleAndPath().setDescription().setPaths().setOperations();

  docs.push({
    title: oasBuilder.title,
    oas: oasBuilder.oas,
    path: oasBuilder.path,
    operations: oasBuilder.operations,
  });
}

async function generateMdxForApiDocs() {
  for (const spec of API_SPEC_PATH) {
    await generateApiDoc(spec);
  }

  console.log(docs);
}

generateMdxForApiDocs();
