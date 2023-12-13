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
      className={classNames(
        "flex flex-col gap-4",
        "border-b-1 pb-[3.5rem] mb-12",
        additionalClassNames
      )}
    >
      <Heading level={1}>{frontMatter?.title as string}</Heading>
      <Text className="max-w-[37.5rem]">{frontMatter?.description}</Text>
    </header>
  );
}
