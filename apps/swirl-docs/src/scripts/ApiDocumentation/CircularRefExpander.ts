import { OASDocument } from "oas/dist/rmoas.types";

/**
 * `Oas.dereference()` resolves every `$ref` except the ones taking part in a circular chain, which
 * it deliberately leaves as `{ $ref: "#/..." }` so that circular references stay detectable. Any
 * schema reachable from such a chain therefore arrives at the renderer without `type` or
 * `properties`, and both its property table and its response example come out empty.
 *
 * This expands those leftovers back into inline schemas, allowing each pointer to appear a bounded
 * number of times per branch so the result stays finite and JSON-serialisable.
 */
export class CircularRefExpander {
  private static readonly MAX_OCCURRENCES_PER_BRANCH = 2;

  static expand(document: OASDocument): OASDocument {
    return {
      ...document,
      paths: new CircularRefExpander(document).expandNode(document.paths, {}),
    };
  }

  private constructor(private readonly document: OASDocument) {}

  private expandNode(node: unknown, occurrences: Record<string, number>): any {
    if (Array.isArray(node)) {
      return node.map((entry) => this.expandNode(entry, occurrences));
    }

    if (node === null || typeof node !== "object") {
      return node;
    }

    const pointer = (node as { $ref?: unknown }).$ref;

    if (typeof pointer === "string" && pointer.startsWith("#/")) {
      return this.expandPointer(pointer, node, occurrences);
    }

    return Object.fromEntries(
      Object.entries(node).map(([key, value]) => [
        key,
        this.expandNode(value, occurrences),
      ])
    );
  }

  private expandPointer(
    pointer: string,
    node: object,
    occurrences: Record<string, number>
  ): any {
    const target = this.resolve(pointer);

    if (!target) {
      return node;
    }

    const seen = occurrences[pointer] ?? 0;

    if (seen >= CircularRefExpander.MAX_OCCURRENCES_PER_BRANCH) {
      return {
        type: target.type,
        description: target.description,
        "x-readme-ref-name": target["x-readme-ref-name"],
      };
    }

    return this.expandNode(target, { ...occurrences, [pointer]: seen + 1 });
  }

  private resolve(pointer: string): Record<string, any> | undefined {
    return pointer
      .slice(2)
      .split("/")
      .map((segment) => segment.replace(/~1/g, "/").replace(/~0/g, "~"))
      .reduce<any>(
        (parent, segment) =>
          parent === null || typeof parent !== "object"
            ? undefined
            : parent[segment],
        this.document
      );
  }
}
