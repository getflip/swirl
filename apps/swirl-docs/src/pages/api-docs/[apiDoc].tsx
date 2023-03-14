import { createStaticPathsData } from "@swirl/lib/docs";
import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import Head from "next/head";
import { DocumentationLayout } from "../../components/Layout/DocumentationLayout";
import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
import { GetStaticPaths, GetStaticProps } from "next";
import { ScriptProps } from "next/script";
import OASNormalize from "oas-normalize";
import { apiDocsNavItems } from "@swirl/lib/navigation/src/data/apiDocs.data";
import { OASDocument } from "oas/dist/rmoas.types";
import { CodePreview } from "src/components/CodePreview";
import Oas from "oas";
import oasToHar from "@readme/oas-to-har";
import { oasToSnippet } from "@readme/oas-to-snippet";

async function getComponentData(document: string) {
  return await generateMdxFromDocumentation("apiDocs", document);
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryDocs = createStaticPathsData("apiDocs");

  return {
    fallback: false,
    paths: categoryDocs,
  };
};

export const getStaticProps: GetStaticProps<
  ScriptProps,
  { tokenDoc: string }
> = async (context: any) => {
  const { apiDoc } = context.params;

  const document = await getComponentData(apiDoc);

  const oasYaml = new OASNormalize(`./specs/${apiDoc}.yaml`, {
    enablePaths: true,
  });

  const definition = (await oasYaml.validate()) as OASDocument;

  return {
    props: {
      document,
      title: apiDoc,
      definition,
    },
  };
};

export default function Component({
  document,
  title,
  definition,
}: {
  document: any;
  title: string;
  definition: OASDocument;
}) {
  const components = {
    p: (props: any) => <p className="mb-4" {...props} />,
    ...LinkedHeaders,
  };

  const oas = new Oas(definition);

  const operation = oas.operation("/app-compatibility", "get");

  const har = oasToHar(oas, operation);

  const formData = {
    query: { sort: "desc" },
  };

  const auth = {
    oauth2: "bearerToken",
  };

  const language = "curl";

  console.log("EXAMPLES", operation.getResponseExamples());

  const exampleValuesOrEnums =
    operation.getParametersAsJSONSchema()[0].schema.properties;
  console.log(exampleValuesOrEnums);
  const requiredParams =
    operation.getParametersAsJSONSchema()[0].schema.required;

  const { code, highlightMode } = oasToSnippet(
    oas,
    operation,
    formData,
    auth,
    language
  );

  return (
    <>
      <Head>
        <title>{`Swirl | ${title}`}</title>
      </Head>
      <DocumentationLayout
        content={
          <>
            <DocumentationLayout.MDX />
            <CodePreview
              codeExample={{
                code: code as string,
                language: "bash",
                isLongCode: false,
                request: har.log.entries[0].request,
              }}
            >
              <CodePreview.Request />
            </CodePreview>
          </>
        }
        footer={<DocumentationLayout.Footer />}
        navigation={<DocumentationLayout.Navigation />}
        data={{
          mdxContent: {
            document,
            mdxComponents: components,
          },
          navigationLinks: apiDocsNavItems,
          oasSpec: definition,
        }}
      />
    </>
  );
}
