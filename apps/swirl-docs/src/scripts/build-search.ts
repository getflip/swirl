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

import icons from "@getflip/swirl-icons/dist/metadata.js";
import { ParsedUrlQuery } from "querystring";

function isObjectWithParams(
  doc: any
): doc is { params: ParsedUrlQuery; locale?: string } {
  return typeof doc === "object" && "params" in doc;
}

function getAlgoliaDataForCategory(
  category: DocumentationCategory
): Array<AlgoliaRecord> {
  const categoryDocs = createStaticPathsData(category);

  if (!categoryDocs) {
    throw new Error(
      `Could not generate Algolia data for category: ${category}`
    );
  }

  return categoryDocs.filter(isObjectWithParams).map((doc) => {
    const docParams = doc.params[StaticPathMap[category]] as string;
    const document = generateSerializableDocumentation(category, docParams);

    return {
      objectID: document.data.title,
      title: document.data.title,
      excerpt: document.excerpt || "",
      path: `/${category}/${document.data.title
        .toLowerCase()
        .replace(" ", "-")}`,
      tagsCollection: { tags: document.data.tags },
    };
  });
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

  const algoliaIndexableData: Array<AlgoliaRecord> = [];

  colorTokenGroups.forEach((colorTokenGroup) => {
    const transformedTokens = tokens[colorTokenGroup];

    transformedTokens?.forEach((token) => {
      algoliaIndexableData.push({
        objectID: token.name,
        title: token.name,
        type: "token",
        tokenCategory: "color",
        excerpt: token.description || "",
        path: `/tokens/color#${colorTokenGroup}`,
      });
    });
  });

  if (!algoliaIndexableData.length) {
    throw new Error(`Could not generate Algolia data for category: ${123}`);
  }

  return algoliaIndexableData;
}

function getTokenCategory(
  tokenType: Token["type"]
): AlgoliaRecord["tokenCategory"] {
  if (isTypographyToken(tokenType as TokensWithoutColors)) return "typography";
  if (isZindexToken(tokenType as TokensWithoutColors)) return "z-index";
  if (isBorderToken(tokenType as TokensWithoutColors)) return "border";
  if (isSpacingToken(tokenType as TokensWithoutColors)) return "spacing";

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
  const algoliaIndexableData: Array<AlgoliaRecord> = [];

  tokenGroups.forEach((tokenGroup) => {
    const transformedTokens = tokens[tokenGroup];

    transformedTokens?.forEach((token: Token) => {
      const tokenCategory = getTokenCategory(token.type);
      const hashValue = token.name.split("-").slice(0, 2).join("-");

      algoliaIndexableData.push({
        objectID: token.name,
        title: token.name,
        type: "token",
        tokenCategory,
        excerpt: token.description || "",
        path: `/tokens/${tokenCategory}#${hashValue}`,
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

async function validateAlgoliaEnvironment() {
  if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) {
    throw new Error("NEXT_PUBLIC_ALGOLIA_APP_ID is not defined");
  }

  if (!process.env.ALGOLIA_SEARCH_ADMIN_KEY) {
    throw new Error("ALGOLIA_SEARCH_ADMIN_KEY is not defined");
  }
}

function getTransformedData() {
  // const components = getAlgoliaDataForCategory(
  //   DOCUMENTATION_CATEGORY.COMPONENTS
  // );
  const tokens = getAlgoliaDataForCategory(DOCUMENTATION_CATEGORY.TOKENS);
  const iconsData = createIconAlgoliaData();
  const singleTokensData = getAlgoliaDataForTokens();

  return [...iconsData, ...tokens, ...singleTokensData];
}

async function saveAlgoliaData(transformed: Array<AlgoliaRecord>) {
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
}

async function generateAlgoliaData() {
  dotenv.config();

  try {
    await validateAlgoliaEnvironment();
    const transformed = getTransformedData();
    console.log(transformed);
    await saveAlgoliaData(transformed);
  } catch (error) {
    console.error(error);
  }
}

// script execution
generateAlgoliaData();
