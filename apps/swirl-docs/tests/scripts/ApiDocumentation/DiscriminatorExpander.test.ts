import type { ApiEndpoint, OperationSchemaObject } from "@swirl/lib/docs";
import { OASDocument } from "oas/dist/rmoas.types";
import OASBuilder from "src/scripts/ApiDocumentation/oasBuilder";
import { describe, expect, it } from "vitest";

const polymorphicSpec = (): OASDocument =>
  ({
    openapi: "3.0.3",
    info: { title: "Test API", version: "1.0" },
    paths: {
      "/exports": {
        post: {
          operationId: "create-export",
          "x-flip-api-name": "exports",
          "x-flip-resource-name": "exports",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    formats: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Format" },
                    },
                  },
                },
              },
            },
          },
          responses: { "204": { description: "Created." } },
        },
      },
    },
    components: {
      schemas: {
        Format: {
          type: "object",
          discriminator: {
            propertyName: "format",
            mapping: {
              TEXT: "#/components/schemas/TextFormat",
              PDF: "#/components/schemas/PdfFormat",
              DOCX: "#/components/schemas/DocxFormat",
            },
          },
          properties: {
            format: { type: "string", enum: ["TEXT", "PDF", "DOCX"] },
          },
          required: ["format"],
        },
        TextFormat: { allOf: [{ $ref: "#/components/schemas/Format" }] },
        PdfFormat: {
          allOf: [
            { $ref: "#/components/schemas/Format" },
            {
              type: "object",
              properties: {
                language: { type: "string", description: "Document language." },
                attachment: { $ref: "#/components/schemas/Format" },
              },
            },
          ],
        },
        DocxFormat: {
          allOf: [
            { $ref: "#/components/schemas/Format" },
            {
              type: "object",
              properties: {
                language: { type: "string", description: "Document language." },
                template: { type: "string" },
              },
              required: ["template"],
            },
          ],
        },
      },
    },
  } as unknown as OASDocument);

const createExport = async (): Promise<ApiEndpoint> => {
  const builder = await new OASBuilder(polymorphicSpec()).dereference();
  return builder.setApiDocumentations().apiDocumentations[0].resources[0]
    .endpoints[0];
};

const formatProperties = (endpoint: ApiEndpoint): OperationSchemaObject[] =>
  endpoint.requestBody?.[0]?.parameters.find((p) => p.name === "formats")
    ?.properties ?? [];

describe("DiscriminatorExpander", () => {
  it("lists the properties of every subtype under the base schema", async () => {
    const properties = formatProperties(await createExport());

    expect(properties.map((p) => p.name)).toEqual([
      "format",
      "language",
      "attachment",
      "template",
    ]);
    expect(properties.find((p) => p.name === "language")).toMatchObject({
      required: false,
      description:
        "Applies when `format` is `PDF` or `DOCX`.\n\nDocument language.",
    });
    expect(properties.find((p) => p.name === "template")).toMatchObject({
      required: false,
      description: "Applies and is required when `format` is `DOCX`.",
    });
  });

  it("stops at a subtype that is already being expanded", async () => {
    const attachment = formatProperties(await createExport()).find(
      (p) => p.name === "attachment"
    );
    expect(attachment?.properties?.map((p) => p.name)).toEqual([
      "format",
      "language",
      "template",
    ]);
  });

  it("keeps subtype properties out of the generated request example", async () => {
    const http = (await createExport()).request.snippets.http;
    const body = JSON.parse(http.slice(http.indexOf("\r\n\r\n") + 4));

    expect(body).toEqual({ formats: [{ format: "TEXT" }] });
  });
});
