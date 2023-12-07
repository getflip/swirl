import classNames from "classnames";
import { useDocumentationLayoutContext } from "../Layout/DocumentationLayoutContext";
import { Text } from "../swirl-recreations";
import Heading from "../swirl-recreations/Headers";

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
      <Heading level={1}>{frontMatter?.title as string}</Heading>
      <Text className="max-w-[37.5rem]">{frontMatter?.description}</Text>
    </header>
  );
}
