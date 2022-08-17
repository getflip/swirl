import { readdirSync } from "fs";
import StyleDictionary, { TransformedToken } from "style-dictionary";

const { fileHeader, createPropertyFormatter } = StyleDictionary.formatHelpers;

const categories = [
  ...readdirSync("./tokens"),
  ...readdirSync("./tokens/light"),
]
  .filter((fileName) => fileName.endsWith(".json"))
  .map((fileName) => fileName.replace(".json", ""));

const presenters: { [category: string]: string } = {
  "background-color": "Color",
  "border-color": "Color",
  "border-width": "Spacing",
  "font-family": "FontFamily",
  "font-size": "FontSize",
  "font-weight": "FontWeight",
  "icon-color": "Color",
  "letter-spacing": "LetterSpacing",
  "line-height": "LineHeight",
  spacing: "Spacing",
  "text-color": "Color",
  "z-index": "",
  "border-radius": "BorderRadius",
};

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

    for (const category of categories) {
      const tokensOfCategory = dictionary.allTokens.filter((token) =>
        token.filePath.includes(category)
      );

      formattedTokens.push(`
/**
 * @tokens ${category}
 * @presenter ${presenters[category] || ""}
 */
      `);

      for (const token of tokensOfCategory) {
        formattedTokens.push(propertyFormatter(token));
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

StyleDictionary.extend("config.light.json").buildAllPlatforms();
StyleDictionary.extend("config.dark.json").buildAllPlatforms();
