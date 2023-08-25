import { MDXRemoteSerializeResult } from "next-mdx-remote";
import OASNormalize from "oas-normalize";
import { EndpointMapper } from "./EndpointMapper";
import { ApiDocumentation, ApiEndpoint } from "./docs.model";
import OASBuilder from "./oasBuilder";
import { serializeMarkdownString } from "./utils";

export class ApiDocumentationFacade implements ApiDocumentation {
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

  async build() {
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

    this.title = this.oasBuilder.title;
    this.description =
      (await serializeMarkdownString(this.oasBuilder.description)) || "";
    this.shortDescription = this.oasBuilder.shortDescription;
    this.endpoints = this.endpointMapper.map(this.oasBuilder);

    return this;
  }
}
