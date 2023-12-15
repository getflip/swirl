import { Token } from "@swirl/lib/tokens";
import {
  getColsString,
  isBorderToken,
  isColorIndex,
  isSpacingToken,
  isTypographyToken,
  isZindexToken,
} from "@swirl/lib/tokens/src/utils";
import classNames from "classnames";
import { FunctionComponent } from "react";
import TokenItem from "./TokenItem";

interface TokensListProps {
  tokens: Token[];
}

export const TokensList: FunctionComponent<TokensListProps> = ({ tokens }) => {
  const tokenValueTypes = tokens.map((token) => {
    return token.unitAsString;
  });

  const tokenType = tokens.map((token) => {
    return token.type;
  });

  function checkDescription(token: Token) {
    if (token.description) {
      return token.description;
    } else {
      return "";
    }
  }

  const hasTokenDescription = Boolean(tokens.find(checkDescription));

  return (
    <table className="w-full mb-10">
      <thead className="sr-only md:not-sr-only">
        <tr
          className={classNames(
            `grid gap-3 grid-cols-1 md:grid-cols-typography-token-list items-start py-4 border-b-1`,
            {
              "md:grid-cols-color-token-list":
                isColorIndex(tokenType[0]) || isBorderToken(tokenType[0]),
              "md:grid-cols-typography-token-list": isTypographyToken(
                tokenType[0]
              ),
              "md:grid-cols-spacing-token-list": isSpacingToken(tokenType[0]),
              "md:grid-cols-z-index-token-list": isZindexToken(tokenType[0]),
            }
          )}
        >
          <th className="col-span-2 font-semibold text-start text-sm">
            Token Name
          </th>
          <th className="font-semibold text-start text-sm">
            Value ({tokenValueTypes[0]})
          </th>
          {hasTokenDescription && (
            <th className="font-semibold text-start text-sm">Description</th>
          )}
        </tr>
      </thead>
      <tbody>
        {tokens.map((token: Token, index: number) => {
          return <TokenItem key={token.name + `-${index}`} token={token} />;
        })}
      </tbody>
    </table>
  );
};

export default TokensList;
