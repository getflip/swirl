import { AlgoliaRecord } from "@swirl/lib/search";
import {
  ColorTokenGroups,
  Token,
  TokensWithoutColors,
  getColorTokens,
} from "@swirl/lib/tokens";
import {
  getTokens,
  isBorderToken,
  isSpacingToken,
  isTypographyToken,
  isZindexToken,
} from "@swirl/lib/tokens/src/utils";
import { AlgoliaRecordDataGenerator } from "./AlgoliaDataFactory";

type StrictAlgoliaRecord = Required<Omit<AlgoliaRecord, "tagsCollection">> &
  Pick<AlgoliaRecord, "tagsCollection">;

export default class SwirlTokensAlgoliaRecordGenerator
  implements AlgoliaRecordDataGenerator
{
  constructor() {}

  generate(): StrictAlgoliaRecord[] {
    return [...this.generateColorRecords(), ...this.generateTokenRecords()];
  }

  private generateColorRecords(): Array<StrictAlgoliaRecord> {
    const colorTokenGroups: Array<ColorTokenGroups> = [
      "action",
      "background",
      "border",
      "icon",
      "interactive",
      "surface",
      "text",
    ];
    const tokens = getColorTokens();

    const algoliaRecords: Array<StrictAlgoliaRecord> = [];

    colorTokenGroups.forEach((colorTokenGroup) => {
      const transformedTokens = tokens[colorTokenGroup];

      transformedTokens?.forEach((token) => {
        algoliaRecords.push({
          objectID: token.name,
          title: token.name,
          type: "token",
          tokenCategory: "color",
          excerpt: token.description || "",
          path: `/tokens/color#${colorTokenGroup}`,
        });
      });
    });

    return algoliaRecords;
  }

  private generateTokenRecords(): Array<StrictAlgoliaRecord> {
    const tokenGroups: Array<TokensWithoutColors> = [
      "borderRadius",
      "borderWidth",
      "fontSizes",
      "fontWeights",
      "letterSpacing",
      "lineHeights",
      "spacing",
      "zIndex",
    ];

    const tokens = getTokens(tokenGroups);
    const algoliaRecords: Array<StrictAlgoliaRecord> = [];

    tokenGroups.forEach((tokenGroup) => {
      const transformedTokens = tokens[tokenGroup];

      transformedTokens?.forEach((token: Token) => {
        const tokenCategory = this.getTokenCategory(token.type);
        const hashValue = token.name.split("-").slice(0, 2).join("-");

        algoliaRecords.push({
          objectID: token.name,
          title: token.name,
          type: "token",
          tokenCategory,
          excerpt: token.description || "",
          path: `/tokens/${tokenCategory}#${hashValue}`,
        });
      });
    });

    return algoliaRecords;
  }

  private getTokenCategory(
    tokenType: Token["type"]
  ): Exclude<AlgoliaRecord["tokenCategory"], undefined> {
    if (isTypographyToken(tokenType as TokensWithoutColors)) {
      return "typography";
    }
    if (isZindexToken(tokenType as TokensWithoutColors)) {
      return "z-index";
    }
    if (isBorderToken(tokenType as TokensWithoutColors)) {
      return "border";
    }
    if (isSpacingToken(tokenType as TokensWithoutColors)) {
      return "spacing";
    }

    return "color";
  }
}
