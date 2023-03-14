import {
  DOCUMENTATION_CATEGORY,
  createStaticPathsData,
  DocumentationCategory,
  StaticPathMap,
} from "@swirl/lib/docs";
import { generateSerializableDocumentation } from "@swirl/lib/docs/src/singleDoc";
import { AlgoliaRecord, ALGOLIA_INDEX } from "@swirl/lib/search";
import {
  ColorTokenGroups,
  ColorTokens,
  getColorTokens,
  Token,
  TokensWithoutColors,
} from "@swirl/lib/tokens";
import {
  getTokens,
  isBorderToken,
  isSpacingToken,
  isTypographyToken,
  isZindexToken,
} from "@swirl/lib/tokens/src/utils";
import algoliasearch from "algoliasearch";
import dotenv from "dotenv";

// @ts-expect-error
import icons from "@getflip/swirl-icons/dist/metadata.js";

function getAlgoliaDataForCategory(
  category: DocumentationCategory
): Array<AlgoliaRecord> {
  const categoryDocs = createStaticPathsData(category);

  const algoliaIndexableData = categoryDocs?.map((doc) => {
    if (typeof doc !== "string") {
      const docParams = doc.params;

      const param = StaticPathMap[category] as string;
      const paramFull = docParams[param] as string;

      const document = generateSerializableDocumentation(category, paramFull);

      return {
        objectID: document.data.title,
        title: document.data.title,
        excerpt: document.excerpt ? document.excerpt : "",
        path: `/${category}/${document.data.title
          .toLowerCase()
          .replace(" ", "-")}`,
        tagsCollection: { tags: document.data.tags },
      };
    }
  });

  if (!algoliaIndexableData) {
    throw new Error(
      `Could not generate Algolia data for category: ${category}`
    );
  }

  return algoliaIndexableData as Array<AlgoliaRecord>;
}

function createColorTokenAlgoliaData(
  tokens: ColorTokens
): Array<AlgoliaRecord> {
  const colorTokenGroups: Array<ColorTokenGroups> = [
    "action",
    "background",
    "border",
    "icon",
    "interactive",
    "surface",
    "text",
  ];

  let algoliaIndexableData: Array<AlgoliaRecord> = [];

  colorTokenGroups?.forEach((colorTokenGroup) => {
    const transformedTokens = tokens[colorTokenGroup];

    transformedTokens?.forEach((token) => {
      algoliaIndexableData.push({
        objectID: token.name,
        title: token.name,
        type: "token",
        tokenCategory: "color",
        excerpt: token.description ? token.description : "",
        path: `/tokens/color#${colorTokenGroup}`,
      });
    });
  });

  if (!algoliaIndexableData) {
    throw new Error(`Could not generate Algolia data for category: ${123}`);
  }

  return algoliaIndexableData;
}

function getTokenTypeUrl(
  tokenType: Token["type"]
): AlgoliaRecord["tokenCategory"] {
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

function createTokenAlgoliaData(): Array<AlgoliaRecord> {
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

  let algoliaIndexableData: Array<AlgoliaRecord> = [];

  tokenGroups?.forEach((tokenGroup) => {
    const transformedTokens = tokens[tokenGroup];

    transformedTokens?.forEach((token: Token) => {
      const tokenTypeUrl = getTokenTypeUrl(token.type);
      const hashValue = token.name.split("-").slice(0, 2).join("-");

      algoliaIndexableData.push({
        objectID: token.name,
        title: token.name,
        type: "token",
        tokenCategory: tokenTypeUrl,
        excerpt: token.description ? token.description : "",
        path: `/tokens/${tokenTypeUrl}#${hashValue}`,
      });
    });
  });

  if (!algoliaIndexableData) {
    throw new Error(`Could not generate Algolia data for category: ${123}`);
  }

  return algoliaIndexableData;
}

function createIconAlgoliaData(): Array<AlgoliaRecord> {
  const iconsArray = Object.keys(icons);

  let algoliaIndexableData: Array<AlgoliaRecord> = [];

  iconsArray?.forEach((icon: any) => {
    algoliaIndexableData.push({
      objectID: `swirl-icon-${icon}`,
      title: icon,
      type: "icon",
      path: `/icons#${icon}`,
    });
  });

  if (!algoliaIndexableData) {
    throw new Error(`Could not generate Algolia data for category: ${123}`);
  }

  return algoliaIndexableData;
}

function getAlgoliaDataForTokens(): Array<AlgoliaRecord> {
  const tokensAlgoliaData = createTokenAlgoliaData();
  const colorTokensAlgoliaData = createColorTokenAlgoliaData(getColorTokens());
  const data = [...tokensAlgoliaData, ...colorTokensAlgoliaData];

  return data;
}

async function generateAlgoliaData() {
  dotenv.config();

  const singleTokensData = getAlgoliaDataForTokens();

  try {
    if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) {
      throw new Error("NEXT_PUBLIC_ALGOLIA_APP_ID is not defined");
    }

    if (!process.env.ALGOLIA_SEARCH_ADMIN_KEY) {
      throw new Error("ALGOLIA_SEARCH_ADMIN_KEY is not defined");
    }

    const components = getAlgoliaDataForCategory(
      DOCUMENTATION_CATEGORY.COMPONENTS
    );
    const tokens = getAlgoliaDataForCategory(DOCUMENTATION_CATEGORY.TOKENS);
    const iconsData = createIconAlgoliaData();
    const transformed = [
      ...components,
      ...iconsData,
      ...tokens,
      ...singleTokensData,
    ];

    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!!,
      process.env.ALGOLIA_SEARCH_ADMIN_KEY!!
    );

    console.log("transformed", transformed);

    const index = client.initIndex(ALGOLIA_INDEX.DEV);
    const algoliaResponse = await index.saveObjects(transformed);

    console.log(
      `🎉 Sucessfully added ${
        algoliaResponse.objectIDs.length
      } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join(
        "\n"
      )}`
    );
  } catch (error) {
    console.error(error);
  }
}

// script execution
generateAlgoliaData();
