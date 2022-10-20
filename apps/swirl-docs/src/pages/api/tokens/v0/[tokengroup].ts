// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  cssDark,
  cssLight,
  flutterDark,
  flutterLight,
  Formats,
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
    jsonResponse(res, tokengroup);
  }

  if (!Formats.includes(format as string)) {
    res.status(404).json({
      error: "There is no format corresponding your request",
    });
  } else {
    switch (format) {
      case TokenFormats.CSS:
        res.setHeader("Content-Type", "text/css");
        if (scheme === "dark") {
          res.status(200).send(cssDark);
        } else {
          res.status(200).send(cssLight);
        }
        break;
      case TokenFormats.FLUTTER:
        res.setHeader("Content-Type", "text/dart");
        if (scheme === "dark") {
          res.status(200).send(flutterDark);
        } else {
          res.status(200).send(flutterLight);
        }
        break;
      case TokenFormats.LESS:
        res.setHeader("Content-Type", "text/less");
        if (scheme === "dark") {
          res.status(200).send(lessDark);
        } else {
          res.status(200).send(lessLight);
        }
        break;
      case TokenFormats.SCSS:
        res.setHeader("Content-Type", "text/scss");
        if (scheme === "dark") {
          res.status(200).send(scssDark);
        } else {
          res.status(200).send(scssLight);
        }
        break;
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
  switch (tokengroup) {
    case TokenGroup.COLORS:
      res.status(200).json(getTokensForType(TokenGroup.COLORS));
      break;
    case TokenGroup.TYPOGRAPHY:
      res.status(200).json(getTokensForType(TokenGroup.TYPOGRAPHY));
    case TokenGroup.BORDER:
      res.status(200).json(getTokensForType(TokenGroup.BORDER));
    case TokenGroup.SPACING:
      res.status(200).json(getTokensForType(TokenGroup.SPACING));
    case TokenGroup.SPACING:
      res.status(200).json(getTokensForType(TokenGroup.SPACING));
    case TokenGroup.ZINDEX:
      res.status(200).json(getTokensForType(TokenGroup.ZINDEX));
    case TokenGroup.ALL:
      res.status(200).json(getTokensForType(TokenGroup.ALL));
    default:
      res.status(404).json({
        error: "There is no tokengroup corresponding your request",
      });
  }
}
