import OASNormalize from "oas-normalize";
import OASBuilder from "./Oas.builder";
import { AllEndpointErrorCollections } from "../types";

export class ErrorCodeBuilder {
  private path: string;
  private oasBuilder: OASBuilder = {} as OASBuilder;
  private endpointErrorCodes: AllEndpointErrorCollections = [];

  constructor(path: string) {
    this.path = path;
  }

  async initialize() {
    const oasDocument = await new OASNormalize(this.path, {
      enablePaths: true,
      colorizeErrors: true,
    }).validate();

    const oasBuilder = await new OASBuilder(oasDocument).dereference();

    this.oasBuilder = oasBuilder
      .setTitleAndPath()
      .setDescription()
      .setPaths()
      .setOperations()
      .setTags();

    return this;
  }

  public build(): AllEndpointErrorCollections {
    for (const tag in this.oasBuilder.taggedEndpointsMap) {
      const taggedEndpoint = this.oasBuilder.taggedEndpointsMap[tag];

      let endpointErrorCollection: AllEndpointErrorCollections[number] = {
        endpoint: tag
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(""),
        errorCodes: [],
      };

      taggedEndpoint?.forEach((endpoint) => {
        if (endpoint.errorCodes) {
          endpointErrorCollection.errorCodes?.push(endpoint.errorCodes);
        }
      });

      this.endpointErrorCodes.push(endpointErrorCollection);
    }

    return this.endpointErrorCodes;
  }
}
