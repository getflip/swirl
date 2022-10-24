import { Token, TypographyTokenCategory } from "@swirl/lib/tokens";
import { getTypographyTokens } from "@swirl/lib/tokens/src/typographyTokens";
import { FunctionComponent } from "react";
import TokensList from "./TokensList";

interface TypographyTokensProps {
  typographyCategory: TypographyTokenCategory;
}

export const TypographyTokens: FunctionComponent<TypographyTokensProps> = ({
  typographyCategory,
}) => {
  const category = getTypographyTokens();

  const tokens: Token[] = category[typographyCategory] ?? [];

  return <TokensList tokens={tokens} />;
};
