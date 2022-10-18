// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

enum TokenGroup {
  "ALL" = "all",
  "COLORS" = "colors",
  "TYPOGRAPHY" = "typography",
  "BORDER" = "border",
  "SPACING" = "spacing",
  "ZINDEX" = "zindex",
}

type Data = {
  tokengroup: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tokengroup } = req.query;

  switch (tokengroup) {
    case TokenGroup.COLORS:
      res
        .status(200)
        .json({ tokengroup: "there is something like tokengroup color" });
      break;
    case TokenGroup.TYPOGRAPHY:
      res
        .status(200)
        .json({ tokengroup: "there is something like tokengroup typography" });
    default:
      res.status(404).json({
        tokengroup: "There is no tokengroup corresponding your request",
      });
  }
}
