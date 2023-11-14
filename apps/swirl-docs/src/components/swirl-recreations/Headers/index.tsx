import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  LegacyRef,
  ReactElement,
  ReactNode,
  useRef,
} from "react";

import { default as classNames, default as classnames } from "classnames";
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
  id?: string;
  level?: HeadingLevel;
  lines?: number;
  truncate?: boolean;
};

export const Heading: React.FC<HeadingProps> = ({
  align = "start",
  as,
  balance = true,
  id,
  level = 1,
  lines,
  children,
  className,
}) => {
  const headingEl = useRef<HTMLElement>(null);

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
      id={id}
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
  className?: string;
};

export function LinkedHeading({
  children,
  href,
  className,
}: LinkedHeadingProps) {
  return (
    <CopyToClipboard text={href}>
      <div
        className={classNames(
          "relative inline-flex w-full justify-between items-center group delay-200 cursor-pointer",
          className
        )}
      >
        {/** DESKTOP ICON */}
        <i
          className={classnames(
            "swirl-icons-Link28 text-[1.5rem]",
            "absolute left-[-2rem] hidden md:inline-flex",
            "mr-0 text-icon-highlight cursor-pointer duration-300 delay-150",
            "w-0 transform scale-0 transition-transform",
            "group-hover:mr-2",
            "group-hover:w-auto group-hover:scale-100 "
          )}
        ></i>
        <span className="transition-transform duration-300 delay-300">
          {children}
        </span>
        {/** MOBILE ICON */}
        <i
          className={classnames(
            "swirl-icons-Link28 text-[1.25rem]",
            "inline-flex md:hidden",
            "mr-0 text-icon-default"
          )}
        ></i>
      </div>
    </CopyToClipboard>
  );
}

export default Heading;
