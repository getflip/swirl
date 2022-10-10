import { Token } from "@swirl/lib/tokens";
import { FunctionComponent } from "react";
import TokenItem from "./TokenItem";

interface TokensListProps {
  tokens: Token[];
}

export const TokensList: FunctionComponent<TokensListProps> = ({ tokens }) => {
  return (
    <div className="mb-10">
      <div className="hidden md:grid gap-2 grid-cols-5 items-end border-b-1 pb-4">
        <h3 className="col-span-2 font-semibold">Token Name</h3>
        <h3 className="col-span-1 font-semibold">Value</h3>
        <h3 className="col-span-2 font-semibold">Description</h3>
      </div>
      {tokens.map((token: Token, index: number) => {
        return (
          <div key={token.name + `-${index}`}>
            <TokenItem token={token} />
          </div>
        );
      })}
    </div>
  );
};

export default TokensList;
