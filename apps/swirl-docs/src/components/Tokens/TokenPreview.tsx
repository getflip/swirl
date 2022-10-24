import { Token, typographyTypes } from "@swirl/lib/tokens";
import { FunctionComponent } from "react";

export type TokenPreviewProps = {
  token: Token;
};

/*
export const typographyTypes = [
  "fontWeights",
  "lineHeights",
  "letterSpacing",
  "fontFamily",
  "fontSizes",
];
*/

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
        className={`w-12 h-12 mr-2 text-lg`}
      >
        Aa
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
  } else {
    return <div className={`w-12 h-12 mr-2 text-lg`}></div>;
  }
};

export default TokenPreview;
