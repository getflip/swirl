import { getSpacingTokens } from "@swirl/lib/tokens/src/spacingTokens";
import { FunctionComponent } from "react";
import TokensList from "./TokensList";

export const SpacingTokens: FunctionComponent = () => {
  return <TokensList tokens={getSpacingTokens().spacing} />;
};
