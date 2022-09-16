export type TokenItemProps = {
  tokenName: {
    tokenPreview: any;
    codePreview: string;
  };
  value: string;
  description: string;
};

const TokenItem = ({ tokenName, description, value }: TokenItemProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 items-start p-4 border-b-1">
      <div className="col-span-2 flex flex-col mb-2 md:mb-0">
        <div className="inline-flex mb-2 md:mb-0">
          <div className="w-6 h-6 rounded-lg bg-blue-300 mr-2"></div>
          <div className="flex flex-col items-start">
            <code className="bg-gray-100 rounded-md w-100 p-1 text-sm font-font-family-code">
              {tokenName.tokenPreview}
            </code>
          </div>
        </div>
        <span className="text-text-default normal text-sm font-sm ml-0 md:ml-8">
          border/success
        </span>
      </div>
      <div className="col-span-1 mb-2 md:mb-0 text-sm">{value}</div>
      <div className="col-span-2 text-sm">{description}</div>
    </div>
  );
};

export default TokenItem;
