import { ApiResourceDocumentation, ApiEndpoint } from "./docs.model";

import { EndpointMapper } from "./EndpointMapper";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import OASBuilder from "./oasBuilder";
import OASNormalize from "oas-normalize";
import { serializeMarkdownString } from "./utils";

export class ApiDocumentationFacade implements ApiResourceDocumentation {
  title: string = "";
  shortDescription: string = "";
  description: MDXRemoteSerializeResult =
    "" as unknown as MDXRemoteSerializeResult;
  endpoints: ApiEndpoint[] = [];

  private specPath: string;
  private oasBuilder: OASBuilder = {} as OASBuilder;
  private endpointMapper: EndpointMapper;

  constructor(specPath: string) {
    this.specPath = specPath;
    this.endpointMapper = new EndpointMapper();
  }

  async build(): Promise<ApiResourceDocumentation> {
    console.log("Generating documentation for", this.specPath);

    const oasDocument = await new OASNormalize(this.specPath, {
      enablePaths: true,
    }).validate();
    this.oasBuilder = await new OASBuilder(oasDocument)
      .dereference()
      .then((oas) => {
        oas
          .setTitleAndPath()
          .setDescription()
          .setEndpoints()
          .setOperations()
          .setDetailedEndpoints();
        return oas;
      });

    this.title = this.oasBuilder.title.replace("API", "").trim();
    this.description =
      (await serializeMarkdownString(this.oasBuilder.description)) || "";
    this.shortDescription = this.oasBuilder.shortDescription;
    this.endpoints = this.endpointMapper.map(this.oasBuilder);

    return {
      title: this.title,
      shortDescription: this.shortDescription,
      description: this.description,
      endpoints: this.endpoints,
    };
  }
}
