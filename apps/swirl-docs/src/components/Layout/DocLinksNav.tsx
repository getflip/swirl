import { FunctionComponent } from "react";
import { DocHeadline } from "@swirl/lib/docs/src/docs.model";

type DocLinksNavProps = {
  documentLinkList: DocHeadline[] | undefined;
};

export const DocLinksNav: FunctionComponent<DocLinksNavProps> = ({
  documentLinkList,
}) => {
  return (
    <nav className="hidden md:block col-span-2 px-4 border-l-1">
      <div className="mt-6 mb-4 font-sm font-semibold">On this Page</div>
      <ul className="">
        {documentLinkList?.map((link: DocHeadline) => {
          return (
            <li key={link.id} className="relative font-sm mb-2">
              <a
                className="before:block before:absolute before:top-0 before:left-0 before:w-2 before:h-4 before:bg-blue-500"
                href={`#${link.id}`}
              >
                {link.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
