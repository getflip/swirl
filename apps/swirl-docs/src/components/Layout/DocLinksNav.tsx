import { FunctionComponent, useEffect } from "react";
import { DocHeadline } from "@swirl/lib/docs/src/docs.model";
import useScrollObserver from "@swirl/lib/hooks/useScrollObserver";

type DocLinksNavProps = {
  documentLinkList: DocHeadline[];
};

const isBrowser = typeof window !== "undefined";

export const DocLinksNav: FunctionComponent<DocLinksNavProps> = ({
  documentLinkList,
}) => {
  let documents: Element[] = [];
  if (isBrowser) {
    documents = documentLinkList.map(
      (item: DocHeadline) => document.querySelector(`[id="${item.id}"]`)!
    );
  }

  const [currentActiveIndex] = useScrollObserver(documents);

  return (
    <div>
      <nav className="fixed hidden md:block col-span-2 px-4 border-l-1">
        <div className="mt-6 mb-4 font-sm font-semibold">On this Page</div>
        <ul>
          {documentLinkList?.map((link: DocHeadline, index: number) => {
            return (
              <li key={link.id} className="relative font-sm mb-2">
                <a
                  className={`
                  before:block before:absolute before:top-0 before:left-[-17px] before:w-[2px] before:h-6
                  ${
                    currentActiveIndex === index
                      ? "text-blue-500 before:bg-blue-500"
                      : ""
                  }
                `}
                  href={`#${link.id}`}
                >
                  {link.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
