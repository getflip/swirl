import {
  BorderTokenCategories,
  BorderTokenCategory,
  Token,
} from "@swirl/lib/tokens";
import { getTokens } from "@swirl/lib/tokens/src/utils";
import { FunctionComponent } from "react";
import TokensList from "./TokensList";

interface BorderTokenProps {
  category: BorderTokenCategory;
}

export const BorderTokens: FunctionComponent<BorderTokenProps> = ({
  category,
}) => {
  const categories = getTokens(BorderTokenCategories);
  const tokens: Token[] = categories[category] ?? [];
  return <TokensList tokens={tokens} />;
};
