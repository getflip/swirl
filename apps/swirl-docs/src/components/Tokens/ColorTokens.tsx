import { ColorTokenCategory, getColorTokens, Token } from "@swirl/lib/tokens";
import { FunctionComponent } from "react";
import TokensList from "./TokensList";

interface ColorTokensProps {
  colorCategory: ColorTokenCategory;
}
// export const TokensList: FunctionComponent<TokensListProps> = ({ tokens }) => {

export const ColorTokens: FunctionComponent<ColorTokensProps> = ({
  colorCategory,
}) => {
  const category = getColorTokens();

  console.log(category);

  const tokens: Token[] = category[colorCategory] ?? [];

  return <TokensList tokens={tokens} />;
};
