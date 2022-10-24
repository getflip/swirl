import { BorderTokenCategory, Token } from "@swirl/lib/tokens";
import { getBorderTokens } from "@swirl/lib/tokens/src/borderTokens";
import { FunctionComponent } from "react";
import TokensList from "./TokensList";

interface BorderTokenProps {
  category: BorderTokenCategory;
}

export const BorderTokens: FunctionComponent<BorderTokenProps> = ({
  category,
}) => {
  const categories = getBorderTokens();

  const tokens: Token[] = categories[category] ?? [];

  return <TokensList tokens={tokens} />;
};
