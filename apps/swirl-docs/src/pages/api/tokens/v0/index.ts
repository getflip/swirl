// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { OVERVIEW_HTML } from "./utils";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(OVERVIEW_HTML);
}
