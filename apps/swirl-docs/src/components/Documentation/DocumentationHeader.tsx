import classNames from "classnames";
import { useDocumentationLayoutContext } from "../Layout/DocumentationLayoutContext";
import { Tag } from "../Tags";
import Heading from "../swirl-recreations/Headers";
import { Text } from "../swirl-recreations";

export function DocumentationHeader({
  className: additionalClassNames,
}: {
  className?: string;
}) {
  const { frontMatter } = useDocumentationLayoutContext();

  return (
    <header
      className={classNames("border-b-1 pb-12 mb-12", additionalClassNames)}
    >
      {/* DIV IS HERE FOR TAGS ONLY */}
      <div className="mb-space-8 inline-flex items-center max-w-[37.5rem]">
        <Heading level={1}>{frontMatter?.title as string}</Heading>
        {frontMatter?.tags?.map((tag: string) => (
          <Tag key={tag} content={tag} />
        ))}
      </div>
      <Text className="max-w-[37.5rem]">{frontMatter?.description}</Text>
    </header>
  );
}
