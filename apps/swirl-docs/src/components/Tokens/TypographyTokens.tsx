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
  const category = getTokens(
    {
      fontWeights: [],
      lineHeights: [],
      letterSpacing: [],
      fontFamily: [],
      fontSizes: [],
    },
    (type: string) => TypographyTokenCategories.includes(type)
  );

  const tokens: Token[] = category[typographyCategory] ?? [];

  return <TokensList tokens={tokens} />;
};
