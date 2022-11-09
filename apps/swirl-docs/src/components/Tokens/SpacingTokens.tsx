import { SpacingTokenCategories } from "@swirl/lib/tokens";
import { getTokens } from "@swirl/lib/tokens/src/utils";
import { FunctionComponent } from "react";
import TokensList from "./TokensList";

export const SpacingTokens: FunctionComponent = () => {
  const tokens = getTokens(SpacingTokenCategories);
  return <TokensList tokens={tokens.spacing} />;
};
