import {
  Token,
  TypographyTokenCategories,
  TypographyTokenCategory,
} from "@swirl/lib/tokens";
import { getTokens } from "@swirl/lib/tokens/src/utils";
import { FunctionComponent } from "react";
import TokensList from "./TokensList";

interface TypographyTokensProps {
  typographyCategory: TypographyTokenCategory;
}

export const TypographyTokens: FunctionComponent<TypographyTokensProps> = ({
  typographyCategory,
}) => {
  const category = getTokens(TypographyTokenCategories);
  const tokens: Token[] = category[typographyCategory] ?? [];
  return <TokensList tokens={tokens} />;
};
