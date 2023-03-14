import { useDocumentationLayoutContext } from "../Layout/DocumentationLayoutContext";

export function DocumentationHeader() {
  const { frontMatter } = useDocumentationLayoutContext();

  return (
    <header className="border-b-1 pb-12 mb-12">
      <div className="mb-space-8 inline-flex items-center">
        <h1 className="text-4xl text-text-default font-font-weight-bold">
          {frontMatter?.title}
        </h1>
        {frontMatter?.tags?.map((tag: any) => (
          <span
            className="bg-surface-neutral-subdued px-2 py-1 rounded-md ml-3 font-medium text-sm"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-lg leading-line-height-xl text-text-default">
        {frontMatter?.description}
      </p>
    </header>
  );
}
