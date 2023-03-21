import { createStaticPathsData } from "@swirl/lib/docs";
import { generateMdxFromDocumentation } from "@swirl/lib/docs/src/singleDoc";
import Head from "next/head";
import { DocumentationLayout } from "../../components/Layout/DocumentationLayout";
import { LinkedHeaders } from "src/components/Navigation/LinkedHeaders";
import { GetStaticPaths, GetStaticProps } from "next";
import { ScriptProps } from "next/script";
import OASNormalize from "oas-normalize";
import { apiDocsNavItems } from "@swirl/lib/navigation/src/data/apiDocs.data";
import { HttpMethods, OASDocument, PathsObject } from "oas/dist/rmoas.types";
import { CodePreview } from "src/components/CodePreview";
import Oas from "oas";
import oasToHar from "@readme/oas-to-har";
import { oasToSnippet } from "@readme/oas-to-snippet";
import {
  MDXRemote,
  MDXRemoteProps,
  MDXRemoteSerializeResult,
} from "next-mdx-remote";

import { serialize } from "next-mdx-remote/serialize";
import { OpenAPI3 } from "openapi-typescript";

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

  const oasYaml = new OASNormalize(`./specs/${apiDoc.replace("-", "_")}.yml`, {
    enablePaths: true,
  });

  const definition = (await oasYaml.validate()) as OASDocument;

  const oas = new Oas(definition);
  const description = oas.api.info.description;

  const cleanedDescription = description?.replace(
    "<SecurityDefinitions />",
    ""
  );

  const serializedDescription = await serialize(cleanedDescription!, {
    scope: {
      user_external_id: "{user_external_id}",
      postId: "{postId}",
      commentId: "{commentId}",
      attachment_id: "{attachment_id}",
    },
  });

  return {
    props: {
      document,
      title: apiDoc,
      definition,
      description: serializedDescription,
    },
  };
};

export default function Component({
  document,
  title,
  definition,
  description,
}: {
  document: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
  title: string;
  definition: OASDocument;
  description: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}) {
  const components = {
    p: (props: any) => <p className="mb-4" {...props} />,
    ...LinkedHeaders,
  } as MDXRemoteProps["components"];

  // TO DO: Refactor this part to its own creational pattern
  const oas = new Oas(definition);

  const pathsObj = oas.api.paths as PathsObject;

  const paths = Object.keys(oas.api.paths!);
  console.log("paths", paths);

  paths.forEach((path) => {
    if (oas.api.paths !== undefined) {
      console.log(pathsObj[path]);
      const object = pathsObj[path] as PathsObject;

      for (const property in object) {
        const operation = oas.operation(path, property as HttpMethods);
        const har = oasToHar(oas, operation);

        const formData = {
          query: { sort: "desc" },
        };
        const auth = {
          oauth2: "bearerToken",
        };
        const language = "curl";
        const { code } = oasToSnippet(
          oas,
          operation,
          formData,
          auth,
          "javascript"
        );

        console.log(code);
      }
    }
  });

  const operation = oas.operation("/app-compatibility", "get");
  const har = oasToHar(oas, operation);

  const formData = {
    query: { sort: "desc" },
  };
  const auth = {
    oauth2: "bearerToken",
  };
  const language = "curl";
  const { code } = oasToSnippet(oas, operation, formData, auth, "curl");

  return (
    <>
      <Head>
        <title>{`API | ${title}`}</title>
      </Head>
      <DocumentationLayout
        content={
          <>
            <DocumentationLayout.MDX />
            {/* <CodePreview
              codeExample={{
                code: code as string,
                language: "bash",
                isLongCode: true,
                request: har.log.entries[0].request,
              }}
            >
              <CodePreview.Request />
            </CodePreview> */}
            <MDXRemote {...description} />
          </>
        }
        data={{
          mdxContent: {
            document,
            components,
          },
          navigationLinks: apiDocsNavItems,
          oasSpec: definition,
        }}
      />
    </>
  );
}
