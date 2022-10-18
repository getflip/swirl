import StyleDictionary from "style-dictionary";
import {
  mappedTokensType,
  TailwindTokenMap,
  tokenGroups,
  createSwirlTailwindTheme,
} from "./utils";

const { fileHeader, createPropertyFormatter } = StyleDictionary.formatHelpers;

StyleDictionary.registerFormat({
  name: "css/tailwind",
  formatter: function ({ dictionary, file }) {
    const theme = file.destination.split(".")?.[0];
    let mappedTokens: any = {};

    dictionary.allTokens.forEach((token) => {
      const { name, value, type } = token;
      const mappedType = TailwindTokenMap.get(type);

      if (mappedType !== undefined && mappedType !== null) {
        if (!mappedTokens[mappedType as keyof mappedTokensType]) {
          mappedTokens[mappedType as keyof mappedTokensType] = {};
        }

        if (theme === "light") {
          mappedTokens[mappedType as keyof mappedTokensType][name] = {
            DEFAULT: value,
            [`${theme}`]: value,
          };
        } else {
          mappedTokens[mappedType as keyof mappedTokensType][name] = {
            [`${theme}`]: value,
          };
        }
      }
    });

    return JSON.stringify(mappedTokens, null, 2);
  },
});

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
createSwirlTailwindTheme();
