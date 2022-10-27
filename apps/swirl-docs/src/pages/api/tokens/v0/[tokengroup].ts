// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  cssDark,
  cssLight,
  flutterDark,
  flutterLight,
  FORMATS,
  lessDark,
  lessLight,
  scssDark,
  scssLight,
  TokenFormats,
  TokenGroupType,
  tokenMap,
} from "./utils";
const swirlTailwindJson = require("@getflip/swirl-tokens/dist/tailwind/swirl-tailwind.json");

function getTokensForType(type: TokenGroupType): Object {
  const tokenGroup = tokenMap.get(type);
  let tokens: any = {};

  if (!tokenGroup) {
    return {};
  }

  if (type === "all") {
    return swirlTailwindJson;
  }

  tokenGroup.forEach((tokenType) => {
    tokens = {
      ...tokens,
      ...swirlTailwindJson[tokenType],
    };
  });

  return tokens;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer | any>
) {
  const { tokengroup, format, scheme } = req.query;

  const hasNoFormatOrIsJson = !format || format === "json";

  if (hasNoFormatOrIsJson) {
    return jsonResponse(res, tokengroup);
  }

  if (!FORMATS.includes(format as string)) {
    res.status(404).json({
      error: "There is no format corresponding your request",
    });
  } else {
    switch (format) {
      case TokenFormats.CSS:
        res.setHeader("Content-Type", "text/css");
        if (scheme === "dark") {
          return res.status(200).send(cssDark);
        } else {
          return res.status(200).send(cssLight);
        }
      case TokenFormats.FLUTTER:
        res.setHeader("Content-Type", "text/plain");
        if (scheme === "dark") {
          return res.status(200).send(flutterDark);
        } else {
          return res.status(200).send(flutterLight);
        }
      case TokenFormats.LESS:
        res.setHeader("Content-Type", "text/plain");
        if (scheme === "dark") {
          return res.status(200).send(lessDark);
        } else {
          return res.status(200).send(lessLight);
        }
      case TokenFormats.SCSS:
        res.setHeader("Content-Type", "text/plain");
        if (scheme === "dark") {
          return res.status(200).send(scssDark);
        } else {
          return res.status(200).send(scssLight);
        }
    }
  }
}

enum TokenGroup {
  "ALL" = "all",
  "COLORS" = "colors",
  "TYPOGRAPHY" = "typography",
  "BORDER" = "border",
  "SPACING" = "spacing",
  "ZINDEX" = "zindex",
}

/**
 * Send a Tokencategory as JSON
 * @param res
 * @param tokengroup
 */
function jsonResponse(
  res: NextApiResponse<Object>,
  tokengroup: string | string[] | undefined
) {
  res.setHeader("Content-Type", "application/json");
  switch (tokengroup) {
    case TokenGroup.COLORS:
      return res.status(200).json(getTokensForType(TokenGroup.COLORS));
    case TokenGroup.TYPOGRAPHY:
      return res.status(200).json(getTokensForType(TokenGroup.TYPOGRAPHY));
    case TokenGroup.BORDER:
      return res.status(200).json(getTokensForType(TokenGroup.BORDER));
    case TokenGroup.SPACING:
      return res.status(200).json(getTokensForType(TokenGroup.SPACING));
    case TokenGroup.SPACING:
      return res.status(200).json(getTokensForType(TokenGroup.SPACING));
    case TokenGroup.ZINDEX:
      return res.status(200).json(getTokensForType(TokenGroup.ZINDEX));
    case TokenGroup.ALL:
      return res.status(200).json(getTokensForType(TokenGroup.ALL));
    default:
      return res.status(404).json({
        error: "There is no tokengroup corresponding your request",
      });
  }
}
