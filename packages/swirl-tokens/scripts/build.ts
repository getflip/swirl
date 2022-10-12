import StyleDictionary from "style-dictionary";

const { fileHeader, createPropertyFormatter } = StyleDictionary.formatHelpers;

const tokenGroups: {
  [group: string]: {
    excludePrefixed?: string[];
    label: string;
    prefixes: string[];
    presenter: string;
  };
} = {
  backgroundColors: {
    label: "Background Colors",
    prefixes: [
      "background-",
      "surface-",
      "on-surface",
      "action-",
      "decorative-",
      "interactive-",
    ],
    presenter: "Color",
  },
  borderColors: {
    excludePrefixed: ["border-width", "border-radius"],
    label: "Border Colors",
    prefixes: ["border-", "focus"],
    presenter: "Color",
  },
  borderRadius: {
    label: "Border Radius",
    prefixes: ["border-radius-"],
    presenter: "BorderRadius",
  },
  borderWidth: {
    label: "Border Width",
    prefixes: ["border-width-"],
    presenter: "Spacing",
  },
  fontFamilies: {
    label: "Font Families",
    prefixes: ["font-family-"],
    presenter: "FontFamily",
  },
  fontSizes: {
    label: "Font Sizes",
    prefixes: ["font-size-"],
    presenter: "FontSize",
  },
  fontWeights: {
    label: "Font Weights",
    prefixes: ["font-weight-"],
    presenter: "FontWeight",
  },
  iconColors: {
    label: "Icon Colors",
    prefixes: ["icon-"],
    presenter: "Color",
  },
  letterSpacings: {
    label: "Letter Spacings",
    prefixes: ["letter-spacing-"],
    presenter: "LetterSpacing",
  },
  lineHeights: {
    label: "Line Heights",
    prefixes: ["line-height-"],
    presenter: "LineHeight",
  },
  spacings: {
    label: "Spacings",
    prefixes: ["space-"],
    presenter: "Spacing",
  },
  textColors: {
    label: "Text Colors",
    prefixes: ["text-"],
    presenter: "Color",
  },
  other: {
    label: "Other",
    prefixes: [],
    presenter: "",
  },
};

/**
 * Custom CSS formatter for style dictionary to generate design token
 * annotations for https://github.com/UX-and-I/storybook-design-token
 *
 * It uses the default css formatter internally.
 */
StyleDictionary.registerFormat({
  name: "css/variables-design-token-comments",
  formatter: function ({ dictionary, options = {}, file }) {
    const selector = options.selector ? options.selector : `:root`;
    const lineSeparator = "\n";

    const { outputReferences } = options;

    const propertyFormatter = createPropertyFormatter({
      dictionary,
      outputReferences,
      format: "css",
      formatting: {},
    });

    const formattedTokens: string[] = [];

    let unassignedTokens = [...dictionary.allTokens];

    for (const tokenGroup of Object.values(tokenGroups)) {
      const tokensOfGroup =
        tokenGroup.prefixes.length === 0
          ? unassignedTokens
          : unassignedTokens.filter((token) => {
              return (
                tokenGroup.prefixes.some((prefix) =>
                  token.path[0].startsWith(prefix)
                ) &&
                !tokenGroup.excludePrefixed?.some((prefix) =>
                  token.path[0].startsWith(prefix)
                )
              );
            });

      formattedTokens.push(`
  /**
   * @tokens ${tokenGroup.label}
   * @presenter ${tokenGroup.presenter}
   */
          `);

      for (const token of tokensOfGroup) {
        formattedTokens.push(propertyFormatter(token));

        unassignedTokens = unassignedTokens.filter(
          (t) => token.path[0] !== t.path[0]
        );
      }
    }

    return (
      fileHeader({ file }) +
      `${selector} {\n` +
      formattedTokens.filter(Boolean).join(lineSeparator) +
      `\n}\n`
    );
  },
});

StyleDictionary.registerTransform({
  name: "attribute/custom",
  type: "attribute",
  transformer: function (token) {
    const originalAttrs = token.attributes || {};

    const sizeTypes = [
      "borderRadius",
      "borderWidth",
      "fontSizes",
      "letterSpacing",
      "lineHeights",
      "spacing",
    ];

    const category = sizeTypes.includes(token.type)
      ? "size"
      : token.type === "color"
      ? "color"
      : "content";

    const generatedAttrs = {
      category,
      type: token.type,
    };

    return Object.assign(generatedAttrs, originalAttrs);
  },
});

StyleDictionary.extend("config.light.json").buildAllPlatforms();
StyleDictionary.extend("config.dark.json").buildAllPlatforms();
