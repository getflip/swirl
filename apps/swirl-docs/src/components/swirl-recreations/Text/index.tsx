import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
} from "react";
import classnames from "classnames";
import balanceText from "balance-text";
import shave from "shave";

type SwirlTextAlign = "start" | "center" | "end";

const SwirlTextFont = {
  code: "font-font-family-code",
  text: "font-font-family-text",
} as const;
type SwirlTextFontFamily = keyof typeof SwirlTextFont;

type SwirlTextFontStyle = "normal" | "italic";

const SwirlTextSizes = {
  sm: "text-font-size-sm",
  base: "text-font-size-base",
  lg: "text-font-size-lg",
} as const;
type SwirlTextSize = keyof typeof SwirlTextSizes;

const SwirlTextWeights = {
  normal: "font-font-weight-normal",
  medium: "font-font-weight-medium",
  semibold: "font-font-weight-semibold",
  bold: "font-font-weight-bold",
} as const;
type SwirlTextWeight = keyof typeof SwirlTextWeights;

type SwirlTextTag = "p" | "span" | "div";

type SwirlTextProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> & {
  align?: SwirlTextAlign;
  as?: SwirlTextTag;
  balance?: boolean;
  children?: React.ReactNode;
  fontFamily?: SwirlTextFontFamily;
  fontStyle?: SwirlTextFontStyle;
  lines?: number;
  size?: SwirlTextSize;
  truncate?: boolean;
  weight?: SwirlTextWeight;
};

export const SwirlText: FC<SwirlTextProps> = ({
  align = "start",
  as = "p",
  balance,
  fontFamily = "text",
  fontStyle = "normal",
  lines,
  size = "base",
  truncate,
  weight = "normal",
  children,
}) => {
  const textEl = useRef<HTMLElement>(null);

  const rebalance = useCallback(() => {
    if (!balance || !textEl.current) {
      return;
    }

    balanceText(textEl.current);
  }, [balance, textEl]);

  const handleTruncation = useCallback(() => {
    if (!truncate || !lines || lines === 1) {
      return;
    }

    const lineHeight = parseFloat(
      window.getComputedStyle(textEl.current!).lineHeight.replace("px", "")
    );

    if (lineHeight > 0) {
      shave(textEl.current!, lineHeight * lines);
    }
  }, [truncate, lines, textEl]);

  useEffect(() => {
    rebalance();
    handleTruncation();

    const handleResize = () => {
      rebalance();
      handleTruncation();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [rebalance, handleTruncation]);

  const Tag = as as SwirlTextTag;
  return (
    <Tag
      ref={textEl as LegacyRef<HTMLParagraphElement>}
      className={classnames(
        `text-${align}`,
        `${SwirlTextFont[fontFamily]}`,
        `${SwirlTextWeights[weight]}`,
        `${SwirlTextSizes[size]}`,
        {
          italic: fontStyle === "italic",
        },
        {
          truncate: truncate && (!lines || lines === 1),
        }
      )}
    >
      {children}
    </Tag>
  );
};
