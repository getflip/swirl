import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  LegacyRef,
  ReactElement,
  ReactNode,
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

const Heading: React.FC<HeadingProps> = ({
  align = "start",
  as,
  balance = true,
  headingId,
  level = 1,
  lines,
  children,
}) => {
  const headingEl = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!balance || !headingEl.current || lines) {
      return;
    }
    const currentHeading = headingEl.current; // to be save the cleanup works in Line 41
    balanceText(currentHeading);
    window.addEventListener("resize", () => balanceText(headingEl.current));
    return () =>
      window.removeEventListener("resize", () => balanceText(currentHeading));
  }, [balance, lines]);

  const Tag = as || (`h${level}` as HeadingTag);

  return (
    <Tag
      className={classNames(
        "block w-full m-0 p-0 text-start",
        { "text-left": align === "start" },
        { "text-center": align === "center" },
        { "text-right": align === "end" },
        {
          [`text-text-default font-font-weight-bold text-3xl leading-[2.25rem]`]:
            level === 1,
          [`text-text-default font-font-weight-semibold text-font-size-2xl leading-[2rem]`]:
            level === 2,
          [`text-text-default font-font-weight-bold text-font-size-xl leading-[1.75rem]`]:
            level === 3,
          [`text-text-default font-font-weight-bold text-font-size-base leading-[1.5rem]`]:
            level === 4,
        }
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
      <div className="relative inline-flex items-center group delay-200 cursor-pointer mb-4">
        <SwirlIconLink
          className={classnames(
            "absolute left-[-2rem]",
            "mr-0 text-text-info cursor-pointer duration-300 delay-150",
            "w-0 transform scale-0 transition-transform",
            "group-hover:mr-2",
            "group-hover:w-auto group-hover:scale-100 "
          )}
          size={24}
        />
        <span className="transition-transform duration-300 delay-300">
          {children}
        </span>
      </div>
    </CopyToClipboard>
  );
}

export default Heading;
