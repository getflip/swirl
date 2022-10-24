import { Token } from "@swirl/lib/tokens";
import { FunctionComponent } from "react";
import TokenItem from "./TokenItem";

interface TokensListProps {
  tokens: Token[];
}

export const TokensList: FunctionComponent<TokensListProps> = ({ tokens }) => {
  return (
    <table className="mb-10">
      <thead>
        <tr className="hidden md:grid gap-2 grid-cols-5 items-end border-b-1 pb-4">
          <th className="col-span-2 font-semibold text-start">
            <h3>Token Name</h3>
          </th>
          <th className="col-span-1 font-semibold text-start">
            <h3>Value</h3>
          </th>
          <th className="col-span-2 font-semibold text-start">
            <h3>Description</h3>
          </th>
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
