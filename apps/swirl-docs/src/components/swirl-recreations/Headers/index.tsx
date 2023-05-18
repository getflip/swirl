import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  LegacyRef,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import classNames from "classnames";
import balanceText from "balance-text";
import { SwirlIconLink } from "@getflip/swirl-components-react";
import classnames from "classnames";
import CopyToClipboard from "react-copy-to-clipboard";

type HeadingAlign = "start" | "center" | "end";

type HeadingLevel = 1 | 2 | 3 | 4;

type HeadingTag = "h1" | "h2" | "h3" | "h4";

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  children?: ReactNode;
  align?: HeadingAlign;
  as?: HeadingTag;
  balance?: boolean;
  headingId?: string;
  level?: HeadingLevel;
  lines?: number;
  truncate?: boolean;
};

export const Heading: React.FC<HeadingProps> = ({
  align = "start",
  as,
  balance = true,
  headingId,
  level = 1,
  lines,
  children,
  className,
}) => {
  const headingEl = useRef<HTMLElement>(null);

  const rebalance = useCallback(() => {
    if (!balance || !headingEl.current || lines) {
      return;
    }

    balanceText(headingEl.current);
  }, [balance, lines]);

  useEffect(() => {
    rebalance();

    const handleResize = () => {
      rebalance();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [rebalance]);

  const Tag = as || (`h${level}` as HeadingTag);

  return (
    <Tag
      className={classNames(
        "block w-full m-0 p-0 text-start font-font-weight-semibold",
        { "text-left": align === "start" },
        { "text-center": align === "center" },
        { "text-right": align === "end" },
        {
          [`text-text-default text-3xl leading-[3rem]`]: level === 1,
          [`text-text-default text-font-size-2xl leading-[2rem]`]: level === 2,
          [`text-text-default text-font-size-xl leading-[1.625rem]`]:
            level === 3,
          [`text-text-default text-font-size-base leading-[1.5rem]`]:
            level === 4,
        },
        className
      )}
      id={headingId}
      ref={headingEl as LegacyRef<HTMLHeadingElement>}
    >
      {children}
    </Tag>
  );
};

type LinkedHeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  children: ReactElement<typeof Heading>;
  href: string;
};

export function LinkedHeading({ children, href }: LinkedHeadingProps) {
  return (
    <CopyToClipboard text={href}>
      <div className="relative inline-flex w-full justify-between items-center group delay-200 cursor-pointer mb-4">
        {/** DESKTOP ICON */}
        <SwirlIconLink
          className={classnames(
            "absolute left-[-2rem] hidden md:inline-flex",
            "mr-0 text-icon-highlight cursor-pointer duration-300 delay-150",
            "w-0 transform scale-0 transition-transform",
            "group-hover:mr-2",
            "group-hover:w-auto group-hover:scale-100 "
          )}
          size={24}
        />
        <span className="transition-transform duration-300 delay-300">
          {children}
        </span>
        {/** MOBILE ICON */}
        <SwirlIconLink
          className={classnames(
            "inline-flex md:hidden",
            "mr-0 text-icon-default"
          )}
          size={20}
        />
      </div>
    </CopyToClipboard>
  );
}

export default Heading;
