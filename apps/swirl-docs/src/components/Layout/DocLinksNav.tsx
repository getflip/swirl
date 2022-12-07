import { FunctionComponent, useEffect } from "react";
import { DocHeadline } from "@swirl/lib/docs/src/docs.model";
import useScrollObserver from "@swirl/lib/hooks/useScrollObserver";
import Link from "next/link";

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
    <div className="hidden md:block min-w-[12rem]">
      <nav
        aria-label="document"
        className="fixed hidden md:block px-4 border-l-1 mt-6"
      >
        <div className="mb-4 font-sm font-semibold text-text-subdued text-sm">
          On this Page
        </div>
        <ul>
          {documentLinkList?.map((link: DocHeadline, index: number) => {
            return (
              <li key={link.id} className="relative font-sm mb-2">
                <Link href={`#${link.id}`}>
                  <a
                    className={`
                    transition-colors duration-500 ease-in-out
                    before:transition-colors before:duration-500 before:ease-in-out
                    before:block before:absolute before:top-0 before:left-[-17px] before:w-[2px] before:h-6 text-sm
                    ${
                      currentActiveIndex === index
                        ? "text-border-info before:bg-border-info"
                        : "text-text-subdued"
                    }
                  `}
                  >
                    {link.title}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
