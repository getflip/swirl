import { FrontMatter } from "@swirl/lib/docs/src/docs.model";
import { FunctionComponent } from "react";

interface DocumentationHeaderProps {
  frontMatter: FrontMatter;
}

export const DocumentationHeader: FunctionComponent<
  DocumentationHeaderProps
> = ({ frontMatter }) => {
  return (
    <header className="border-b-1 pb-12 mb-12">
      <div className="mb-1 inline-flex items-center">
        <h1 className="text-4xl text-text-default ">{frontMatter.title}</h1>
        {frontMatter.tags?.map((tag) => (
          <span
            className="bg-surface-neutral-subdued px-2 py-1 rounded-md ml-2 font-medium text-sm"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-lg leading-line-height-xl text-text-default">
        {frontMatter.description}
      </p>
    </header>
  );
};
