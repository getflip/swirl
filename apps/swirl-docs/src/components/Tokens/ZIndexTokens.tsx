import { ZIndexTokenCategories } from "@swirl/lib/tokens";
import { getTokens } from "@swirl/lib/tokens/src/utils";
import { FunctionComponent } from "react";
import TokensList from "./TokensList";

export const ZIndexTokens: FunctionComponent = () => {
  const tokens = getTokens(ZIndexTokenCategories);
  return <TokensList tokens={tokens.zIndex} />;
};
