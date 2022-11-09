import { Token, typographyTypes } from "@swirl/lib/tokens";
import { FunctionComponent } from "react";

export type TokenPreviewProps = {
  token: Token;
};

const TokenPreview: FunctionComponent<TokenPreviewProps> = ({ token }) => {
  if (token.type === "color") {
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
  } else if (token.type === "fontWeights") {
    return (
      <div
        style={{ fontWeight: token.value }}
        className={`w-12 h-12 mr-2 text-lg`}
      >
        Aa
      </div>
    );
  } else if (token.type === "fontSizes") {
    return (
      <div
        style={{ fontSize: token.value }}
        className={`w-12 h-12 mr-2 text-lg`}
      >
        Aa
      </div>
    );
  } else if (token.type === "lineHeights") {
    return (
      <div
        style={{ lineHeight: token.value }}
        className={`w-16 h-16 mr-2 text-lg`}
      >
        Aa
        <br />
        Bb
      </div>
    );
  } else if (token.type === "letterSpacing") {
    return (
      <div
        style={{ letterSpacing: token.value }}
        className={`w-12 h-12 mr-2 text-lg`}
      >
        Aa
      </div>
    );
  } else if (token.type === "borderRadius") {
    return (
      <div
        style={{ borderRadius: token.value }}
        className={`w-12 h-12 bg-core-gray-02-dark mr-4`}
      ></div>
    );
  } else if (token.type === "borderWidth") {
    return (
      <div
        style={{
          borderTop: `${token.value} solid var(--s-interactive-primary-default)`,
        }}
        className={`w-24 h-2 bg-core-gray-02-dark mr-4`}
      ></div>
    );
  } else if (token.type === "spacing") {
    return (
      <div className="flex justify-start items-center mr-4 w-16">
        <div className="w-4 h-4 rounded-full bg-border-info"></div>
        <div
          style={{ width: token.value }}
          className={`h-8 bg-core-gray-02-dark`}
        ></div>
        <div className="w-4 h-4 rounded-full bg-border-info"></div>
      </div>
    );
  } else if (token.type === "other") {
    const zIndexPlains = ["50", "40", "30", "20", "10", "0"].map((plain) => {
      const backgroundColor =
        plain === token.value || token.value === "auto"
          ? "bg-border-info"
          : "bg-core-gray-02-dark";
      return (
        <div key={plain}>
          <div
            className={`w-24 h-2 mb-1 rounded-full
            ${backgroundColor}`}
          ></div>
        </div>
      );
    });
    return <div className="mr-4">{zIndexPlains}</div>;
  } else {
    return <div className={`w-12 h-12 mr-2 text-lg`}></div>;
  }
};

export default TokenPreview;
