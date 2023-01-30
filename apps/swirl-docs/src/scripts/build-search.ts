import {
  DOCUMENTATION_CATEGORY,
  createStaticPathsData,
  DocumentationCategory,
  StaticPathMap,
} from "@swirl/lib/docs";
import { generateSerializableDocumentation } from "@swirl/lib/docs/src/singleDoc";
import { ALGOLIA_INDEX } from "@swirl/lib/search";
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
type AlogliaData = Record<string, any>[];

function getAlgoliaDataForCategory(
  category: DocumentationCategory
): AlogliaData {
  const categoryDocs = createStaticPathsData(category);

  const algoliaIndexableData = categoryDocs?.map((doc) => {
    const docParams = doc.params;

    const document = generateSerializableDocumentation(
      category,
      docParams[StaticPathMap[category]]
    );

    return {
      objectID: document.data.title,
      title: document.data.title,
      excerpt: document.excerpt ? document.excerpt : "",
      path: `/${category}/${document.data.title
        .toLowerCase()
        .replace(" ", "-")}`,
      tagsCollection: { tags: document.data.tags },
    };
  });

  if (!algoliaIndexableData) {
    throw new Error(
      `Could not generate Algolia data for category: ${category}`
    );
  }

  return algoliaIndexableData;
}

function createColorTokenAlgoliaData(tokens: ColorTokens): AlogliaData {
  const colorTokenGroups: Array<ColorTokenGroups> = [
    "action",
    "background",
    "border",
    "icon",
    "interactive",
    "surface",
    "text",
  ];

  let algoliaIndexableData: AlogliaData = [];

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

function getTokenTypeUrl(tokenType: Token["type"]): string {
  if (isTypographyToken(tokenType)) {
    return "typography";
  }

  if (isZindexToken(tokenType)) {
    return "z-index";
  }

  if (isBorderToken(tokenType)) {
    return "border";
  }

  if (isSpacingToken(tokenType)) {
    return "spacing";
  }

  return "";
}

function createTokenAlgoliaData(): AlogliaData {
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

  let algoliaIndexableData: AlogliaData = [];

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

function getAlgoliaDataForTokens(): AlogliaData {
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
    // const icons = getAlgoliaDataForCategory(DOCUMENTATION_CATEGORY.ICONS);
    const transformed = [...components, ...tokens, ...singleTokensData];

    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!!,
      process.env.ALGOLIA_SEARCH_ADMIN_KEY!!
    );

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
