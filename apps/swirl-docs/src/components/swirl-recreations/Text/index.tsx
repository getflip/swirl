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
import shave from "shave";

type TextAlign = "start" | "center" | "end";

const TextFont = {
  code: "font-font-family-code",
  text: "font-font-family-text",
} as const;
type TextFontFamily = keyof typeof TextFont;

type TextFontStyle = "normal" | "italic";

const TextSizes = {
  sm: "text-font-size-sm",
  base: "text-font-size-base",
  lg: "text-font-size-lg",
} as const;
type TextSize = keyof typeof TextSizes;

const TextWeights = {
  normal: "font-font-weight-normal",
  medium: "font-font-weight-medium",
  semibold: "font-font-weight-semibold",
  bold: "font-font-weight-bold",
} as const;
type TextWeight = keyof typeof TextWeights;

type TextTag = "p" | "span" | "div";

type TextProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
> & {
  align?: TextAlign;
  as?: TextTag;
  balance?: boolean;
  children?: React.ReactNode;
  fontFamily?: TextFontFamily;
  fontStyle?: TextFontStyle;
  lines?: number;
  size?: TextSize;
  truncate?: boolean;
  weight?: TextWeight;
};

export const Text: FC<TextProps> = ({
  align = "start",
  as = "p",
  balance,
  className,
  fontFamily = "text",
  fontStyle = "normal",
  lines,
  size = "base",
  truncate,
  weight = "normal",
  children,
}) => {
  const textEl = useRef<HTMLElement>(null);

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
    handleTruncation();

    const handleResize = () => {
      handleTruncation();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleTruncation]);

  const Tag = as as TextTag;
  return (
    <Tag
      ref={textEl as LegacyRef<HTMLParagraphElement>}
      className={classnames(
        className,
        `text-${align}`,
        `${TextFont[fontFamily]}`,
        `${TextWeights[weight]}`,
        `${TextSizes[size]}`,
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
