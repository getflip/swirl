import { Token } from "@swirl/lib/tokens";

export type TokenItemProps = {
  token: Token;
};

const TokenItem = ({ token }: TokenItemProps) => {
  console.log(token.name);
  const backgroundColor = `bg-${token.name}`;

  return (
    <div className="grid gap-2 grid-cols-1 lg:grid-cols-5 items-start p-4 border-b-1">
      <div className="col-span-2 flex flex-col mb-2 md:mb-0">
        <div className="inline-flex mb-2 md:mb-0">
          {token.type === "color" && (
            <div className={`w-6 h-6 rounded-lg ${backgroundColor} mr-2`}></div>
          )}
          <div className="flex flex-col items-start">
            <code className="bg-gray-100 rounded-md w-100 p-1 text-sm font-font-family-code">
              {token.name}
            </code>
          </div>
        </div>
        {/* <span className="text-text-default normal text-sm font-sm ml-0 md:ml-8">
          border/success
        </span> */}
      </div>
      <div className="col-span-1 mb-2 md:mb-0 text-sm">{token.value}</div>
      <div className="col-span-2 text-sm">{token.description}</div>
    </div>
  );
};

export default TokenItem;
