import { Token } from "@swirl/lib/tokens";
import {
  isBorderToken,
  isColorIndex,
  isSpacingToken,
  isTypographyToken,
  isZindexToken,
} from "@swirl/lib/tokens/src/utils";
import classNames from "classnames";
import TokenPreview from "./TokenPreview";

export type TokenItemProps = {
  token: Token;
};

const TokenItem = ({ token }: TokenItemProps) => {
  return (
    <tr
      className={classNames(
        `grid gap-2 grid-cols-1 md:grid-cols-typography-token-list items-start py-4 border-b-1`,
        {
          "md:grid-cols-color-token-list":
            isColorIndex(token.type) || isBorderToken(token.type),
          "md:grid-cols-typography-token-list": isTypographyToken(token.type),
          "md:grid-cols-spacing-token-list": isSpacingToken(token.type),
          "md:grid-cols-z-index-token-list": isZindexToken(token.type),
        }
      )}
    >
      <td>
        <TokenPreview token={token} />
      </td>
      <td className="col-span-2 flex flex-col mb-2 md:mb-0">
        <div className="inline-flex mb-2 md:mb-0">
          <div className="flex flex-col items-start max-w-[100%]">
            <code className="w-full whitespace-pre overflow-hidden text-ellipsis bg-gray-100 rounded-md p-1 text-sm font-font-family-code">
              <dfn className="not-italic" title={token.name}>
                {token.name}
              </dfn>
            </code>
          </div>
        </div>
      </td>
      <td className="col-span-1 mb-2 md:mb-0 text-sm">
        <code>{token.valueAsString}</code>
      </td>
      {token.description && (
        <td className="col-span-2 text-xs">{token.description}</td>
      )}
    </tr>
  );
};

export default TokenItem;
