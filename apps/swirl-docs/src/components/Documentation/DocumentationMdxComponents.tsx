import { MDXRemoteProps } from "next-mdx-remote";
import { H2, H3, H4 } from "src/components/Navigation/LinkedHeaders";

import { CodePreview } from "src/components/CodePreview";
import ApiGrid from "src/components/Documentation/ApiGrid";
import ApiTile from "src/components/Documentation/ApiTile";
import { Text } from "src/components/swirl-recreations";

export const DocumentationMdxComponents = {
  section: (props) => <section className="mb-8 last:mb-0" {...props} />,
  a: (props) => {
    const isRegularLink = typeof props.children === "string";

    return isRegularLink ? (
      <span className="inline-flex items-center text-interactive-primary-default">
        <a {...props} />
        <i className="swirl-icons-OpenInNew28 text-[1.25rem] ml-1"></i>
      </span>
    ) : (
      <a {...props} />
    );
  },

  ul: (props) => (
    <ul
      className="mb-8 last:mb-0 leading-line-height-xl list-disc"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mb-8 last:mb-0 leading-line-height-xl list-decimal"
      {...props}
    />
  ),
  li: (props) => <li className="ml-4" {...props} />,
  p: (props) => <Text className="mb-8 last:mb-0" {...props} />,
  code: (props) => {
    const { className, children } = props;

    if (className?.includes("language-") && typeof children === "string") {
      return (
        <CodePreview
          disableHeader
          className="mb-4 last:mb-0"
          hasCopyButton
          codeExample={{
            code: children,
            isLongCode: false,
          }}
        />
      );
    }

    return (
      <code
        className="bg-gray-100 rounded-md p-1 text-sm font-font-family-code"
        {...props}
      />
    );
  },
  h1: (props: any) => (
    <H2 className="mb-6 last:mb-0" {...props} href={`#${props.id}`} />
  ),
  h2: (props: any) => (
    <H2 className="mb-6 last:mb-0" {...props} href={`#${props.id}`} />
  ),
  h3: (props: any) => (
    <H3 className="mb-2 last:mb-0" {...props} href={`#${props.id}`} />
  ),
  h4: (props: any) => (
    <H4 className="mb-2 last:mb-0" {...props} href={`#${props.id}`} />
  ),
  h5: (props: any) => (
    <H4 className="mb-2 last:mb-0" {...props} href={`#${props.id}`} />
  ),
  h6: (props: any) => (
    <H4 className="mb-2 last:mb-0" {...props} href={`#${props.id}`} />
  ),
  hr: (props) => <hr className="my-8" {...props} />,
  ApiGrid: (props: any) => <ApiGrid {...props} />,
  ApiTile: (props: any) => <ApiTile {...props} />,
} as MDXRemoteProps["components"];
