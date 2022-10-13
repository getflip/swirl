import { Token } from "@swirl/lib/tokens";
import { FunctionComponent } from "react";

export type TokenItemProps = {
  token: Token;
};

const TokenItem = ({ token }: TokenItemProps) => {
  return (
    <tr className="grid gap-2 grid-cols-1 md:grid-cols-5 items-start p-4 border-b-1">
      <td className="col-span-2 flex flex-col mb-2 md:mb-0">
        <div className="inline-flex mb-2 md:mb-0">
          {token.type === "color" && <ColorPreview token={token} />}
          <div className="flex flex-col items-start">
            <code className="bg-gray-100 rounded-md p-1 text-sm font-font-family-code">
              {token.name}
            </code>
          </div>
        </div>
      </td>
      <td className="col-span-1 mb-2 md:mb-0 text-sm">{token.value}</td>
      <td className="col-span-2 text-sm">{token.description}</td>
    </tr>
  );
};

export default TokenItem;

const ColorPreview: FunctionComponent<TokenItemProps> = ({ token }) => {
  const backgroundColor = `bg-${token.name}`;
  const whiteColors = ["rgba(255, 255, 255, 1)"];
  const hasBorder = whiteColors.includes(token.value)
    ? "border-2 border-border-default"
    : "";
  return (
    <div
      className={`w-6 h-6 rounded-lg ${backgroundColor} ${hasBorder} mr-2`}
    ></div>
  );
};
