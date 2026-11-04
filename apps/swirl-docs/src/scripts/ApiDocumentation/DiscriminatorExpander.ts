import { OASDocument } from "oas/dist/rmoas.types";

type Schema = Record<string, unknown>;

type CollectedProperties = { properties: Schema; required: string[] };

type SubtypeProperty = { schema: unknown; values: string[]; required: boolean };

const isSchema = (value: unknown): value is Schema =>
  value !== null && typeof value === "object" && !Array.isArray(value);

/**
 * A polymorphic base schema declares only the properties shared by all its subtypes and names the
 * subtypes in `discriminator.mapping`. The renderer reads `properties` only, so the properties that
 * exist on a subtype alone never show up.
 *
 * This adds every subtype's own properties to the base, each prefixed with the discriminator values
 * it applies to. Such a property stays optional on the base, because it is not required for every
 * subtype.
 */
export class DiscriminatorExpander {
  static expand(document: OASDocument): OASDocument {
    const paths = new DiscriminatorExpander(document).expandNode(
      document.paths,
      []
    );

    // OASDocument is a 3.0/3.1 union whose `paths` types TypeScript cannot pair with the spread.
    return { ...document, paths } as OASDocument;
  }

  private constructor(private readonly document: OASDocument) {}

  /** `expanding` holds the mapped subtypes on the current branch, so recursive subtypes stop. */
  private expandNode(node: unknown, expanding: string[]): unknown {
    if (Array.isArray(node)) {
      return node.map((entry) => this.expandNode(entry, expanding));
    }

    if (!isSchema(node)) {
      return node;
    }

    const expanded = Object.fromEntries(
      Object.entries(node).map(([key, value]) => [
        key,
        this.expandNode(value, expanding),
      ])
    );

    return this.withSubtypeProperties(expanded, expanding);
  }

  private withSubtypeProperties(schema: Schema, expanding: string[]): Schema {
    const discriminator = isSchema(schema.discriminator)
      ? schema.discriminator
      : undefined;
    const propertyName = discriminator?.propertyName;
    const mapping = discriminator?.mapping;

    if (typeof propertyName !== "string" || !isSchema(mapping)) {
      return schema;
    }

    const ownProperties = isSchema(schema.properties) ? schema.properties : {};
    const subtypeProperties: Record<string, SubtypeProperty> = {};

    for (const [value, pointer] of Object.entries(mapping)) {
      if (typeof pointer !== "string" || expanding.includes(pointer)) {
        continue;
      }

      const subtype = this.resolve(pointer);

      if (!subtype) {
        continue;
      }

      const { properties, required } = this.collectProperties(subtype);

      for (const [name, property] of Object.entries(properties)) {
        if (name in ownProperties) {
          continue;
        }

        const entry = (subtypeProperties[name] ??= {
          schema: this.expandNode(property, [...expanding, pointer]),
          values: [],
          required: true,
        });
        entry.values.push(value);
        entry.required &&= required.includes(name);
      }
    }

    if (Object.keys(subtypeProperties).length === 0) {
      return schema;
    }

    return {
      ...schema,
      properties: {
        ...ownProperties,
        ...Object.fromEntries(
          Object.entries(subtypeProperties).map(([name, entry]) => [
            name,
            this.annotate(entry, propertyName),
          ])
        ),
      },
    };
  }

  /** Collects the properties a schema declares itself and through `allOf`. */
  private collectProperties(schema: Schema): CollectedProperties {
    const own: CollectedProperties = {
      properties: isSchema(schema.properties) ? schema.properties : {},
      required: Array.isArray(schema.required)
        ? schema.required.filter((name) => typeof name === "string")
        : [],
    };

    const parts = Array.isArray(schema.allOf)
      ? schema.allOf.filter(isSchema)
      : [];

    return parts
      .map((part) => this.collectProperties(part))
      .reduce(
        (collected, part) => ({
          properties: { ...collected.properties, ...part.properties },
          required: [...collected.required, ...part.required],
        }),
        own
      );
  }

  private annotate(entry: SubtypeProperty, propertyName: string): unknown {
    if (!isSchema(entry.schema)) {
      return entry.schema;
    }

    const values = entry.values.map((value) => `\`${value}\``).join(" or ");
    const note = entry.required
      ? `Applies and is required when \`${propertyName}\` is ${values}.`
      : `Applies when \`${propertyName}\` is ${values}.`;
    const description = this.description(entry.schema);

    return {
      ...entry.schema,
      description: description ? `${note}\n\n${description}` : note,
    };
  }

  /**
   * The description the renderer would show without the note: the schema's own, else the first one
   * among its `allOf` parts, as `json-schema-merge-allof` keeps the first value it meets.
   */
  private description(schema: Schema): string | undefined {
    if (typeof schema.description === "string") {
      return schema.description;
    }

    const parts = Array.isArray(schema.allOf)
      ? schema.allOf.filter(isSchema)
      : [];

    for (const part of parts) {
      const description = this.description(part);

      if (description) {
        return description;
      }
    }

    return undefined;
  }

  private resolve(pointer: string): Schema | undefined {
    if (!pointer.startsWith("#/")) {
      return undefined;
    }

    const target = pointer
      .slice(2)
      .split("/")
      .map((segment) => segment.replace(/~1/g, "/").replace(/~0/g, "~"))
      .reduce<unknown>(
        (parent, segment) => (isSchema(parent) ? parent[segment] : undefined),
        this.document
      );

    return isSchema(target) ? target : undefined;
  }
}
