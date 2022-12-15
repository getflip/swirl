import { Token } from "@swirl/lib/tokens";
import TokenPreview from "./TokenPreview";

export type TokenItemProps = {
  token: Token;
};

const TokenItem = ({ token }: TokenItemProps) => {
  return (
    <tr className="grid gap-2 grid-cols-1 md:grid-cols-5 items-start p-4 border-b-1">
      <td className="col-span-2 flex flex-col mb-2 md:mb-0">
        <div className="inline-flex mb-2 md:mb-0">
          <TokenPreview token={token} />
          <div className="flex flex-col items-start">
            <code className="w-full max-w-[176px] bg-gray-100 rounded-md p-1 text-sm font-font-family-code">
              {token.name}
            </code>
          </div>
        </div>
      </td>
      <td className="col-span-1 mb-2 md:mb-0 text-sm">
        <code>{token.value}</code>
      </td>
      <td className="col-span-2 text-sm">
        {token.description ? token.description : "-"}
      </td>
    </tr>
  );
};

export default TokenItem;
