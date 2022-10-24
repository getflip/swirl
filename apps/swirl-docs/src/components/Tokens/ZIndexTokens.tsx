import { getZIndexTokens } from "@swirl/lib/tokens/src/zIndexTokens";
import { FunctionComponent } from "react";
import TokensList from "./TokensList";

export const ZIndexTokens: FunctionComponent = () => {
  return <TokensList tokens={getZIndexTokens().zIndex} />;
};
