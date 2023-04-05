import classNames from "classnames";
import { useDocumentationLayoutContext } from "../Layout/DocumentationLayoutContext";
import { Tag } from "../Tags";

export function DocumentationHeader({
  additionalClassNames,
}: {
  additionalClassNames?: string;
}) {
  const { frontMatter } = useDocumentationLayoutContext();

  return (
    <header
      className={classNames("border-b-1 pb-12 mb-12", additionalClassNames)}
    >
      <div className="mb-space-8 inline-flex items-center">
        <h1 className="text-4xl text-text-default font-font-weight-bold mr-2">
          {frontMatter?.title}
        </h1>
        {frontMatter?.tags?.map((tag: string) => (
          <Tag key={tag} content={tag} />
        ))}
      </div>
      <p className="text-lg leading-line-height-xl text-text-default">
        {frontMatter?.description}
      </p>
    </header>
  );
}
