import { OASDocument } from "oas/dist/rmoas.types";
import { EndpointMapper } from "src/scripts/ApiDocumentation/EndpointMapper";
import OASBuilder from "src/scripts/ApiDocumentation/oasBuilder";
import { describe, expect, it } from "vitest";

const recursiveSpec = (): OASDocument =>
  ({
    openapi: "3.0.3",
    info: { title: "Test API", version: "1.0" },
    paths: {
      "/comments/{comment_id}": {
        get: {
          operationId: "get-comment",
          parameters: [
            {
              name: "comment_id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": {
              description: "OK.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Comment" },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Comment: {
          type: "object",
          properties: {
            id: { type: "string" },
            body: { type: "string" },
            replies: {
              type: "array",
              items: { $ref: "#/components/schemas/Comment" },
            },
          },
        },
      },
    },
  } as unknown as OASDocument);

const dereferencedOperation = async () => {
  const builder = await new OASBuilder(recursiveSpec()).dereference();
  return {
    builder,
    operation: builder.oas.operation("/comments/{comment_id}", "get"),
  };
};

describe("CircularRefExpander", () => {
  it("renders the properties of a schema that references itself", async () => {
    const { builder, operation } = await dereferencedOperation();

    const endpoint = new EndpointMapper().mapEndpoint(operation, builder);

    expect(endpoint.responseBody?.[0]?.parameters.map((p) => p.name)).toEqual([
      "id",
      "body",
      "replies",
    ]);
  });

  it("generates a response example for a schema that references itself", async () => {
    const { builder, operation } = await dereferencedOperation();

    expect(builder.generateResponseExamples(operation)["200"]).toContain(
      '"body"'
    );
  });

  it("stops expanding the recursion so the result stays serialisable", async () => {
    const { builder } = await dereferencedOperation();

    const schema = (builder.oas.api.paths as any)?.["/comments/{comment_id}"]
      ?.get?.responses?.["200"]?.content?.["application/json"]?.schema;

    expect(schema.properties.replies.items.properties.replies).toBeDefined();
    expect(
      schema.properties.replies.items.properties.replies.items.properties
    ).toBeUndefined();
    expect(() => JSON.stringify(builder.oas.api)).not.toThrow();
  });
});
