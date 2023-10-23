import { FunctionComponent, useEffect, useRef, useState } from "react";

import { DocHeadline } from "@swirl/lib/docs/src/docs.model";
import Link from "next/link";
import useScrollObserver from "@swirl/lib/hooks/useScrollObserver";

type DocLinksNavProps = {
  documentLinkList: DocHeadline[];
};

const isBrowser = typeof window !== "undefined";

export const DocLinksNav: FunctionComponent<DocLinksNavProps> = ({
  documentLinkList,
}) => {
  let headlines: Element[] = [];

  if (isBrowser) {
    headlines = documentLinkList.flatMap((item) => {
      const sectionElement = document.querySelector(`[id="${item.id}"]`);
      const subsectionElements = item.children.map((sub) =>
        document.querySelector(`[id="${sub.id}"]`)
      );

      // Here, we filter out any null elements
      return [sectionElement, ...subsectionElements].filter(
        (el) => el !== null
      ) as Element[];
    });
  }

  const [activeIndex, setActiveIndexInLinks] = useState(0);
  const [currentActiveIndex] = useScrollObserver(headlines);

  useEffect(() => {
    setActiveIndexInLinks(currentActiveIndex);
  }, [currentActiveIndex]);

  return (
    <nav
      aria-label="document"
      className="sticky top-[128px] h-max hidden min-w-[12rem] md:block px-4 border-l-1"
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
                      activeIndex === index
                        ? "text-border-info before:bg-border-info"
                        : "text-text-subdued"
                    }
                  `}
                  onClick={() => {
                    setActiveIndexInLinks(index);
                    // Wait for the scroll observer to update the active index, then set the active index manually
                    setTimeout(() => {
                      setActiveIndexInLinks(index);
                    }, 100);
                  }}
                >
                  {link.title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
