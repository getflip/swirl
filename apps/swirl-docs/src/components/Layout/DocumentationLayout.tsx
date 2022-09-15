import { DocCategory, DocHeadline } from "@swirl/lib/docs/src/docs.model";

export const DocumentationLayout = ({
  categoryLinkList,
  documentLinkList,
  children,
}: {
  categoryLinkList: DocCategory[] | undefined;
  documentLinkList: DocHeadline[] | undefined;
  children: any;
}) => {
  return (
    <div className="grid grid-cols-12 h-full">
      <nav className="col-span-2 px-4">
        <h2 className="mb-4">Category Links</h2>
        <ul className="list-disc">
          {categoryLinkList?.map((category: DocCategory) => {
            return (
              <li key={category.name} className="list-disc">
                <a href={`${category.path}`}>{category.name}</a>
              </li>
            );
          })}
        </ul>
      </nav>
      <main className="col-span-8">{children}</main>
      <nav className="col-span-2 px-4">
        <h2 className="mb-4">Document Links</h2>
        <ul className="list-disc">
          {documentLinkList?.map((link: DocHeadline) => {
            return (
              <li key={link.id} className="list-disc">
                <a href={`#${link.id}`}>{link.name}</a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
