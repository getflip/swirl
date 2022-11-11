import { ColorTokenGroups, getColorTokens, Token } from "@swirl/lib/tokens";
import { FunctionComponent } from "react";
import TokensList from "./TokensList";

interface ColorTokensProps {
  colorCategory: ColorTokenGroups;
}

export const ColorTokens: FunctionComponent<ColorTokensProps> = ({
  colorCategory,
}) => {
  const category = getColorTokens();

  const tokens: Token[] = category[colorCategory] ?? [];

  return <TokensList tokens={tokens} />;
};
