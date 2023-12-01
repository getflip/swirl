import { useEffect, useState } from "react";

import { DocHeadline } from "../docs/src/docs.model";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export const useToC = (
  children: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >,
  isComponentDoc?: boolean
) => {
  const [toc, setToc] = useState<DocHeadline[]>([]);

  useEffect(() => {
    let tocHeadlines: DocHeadline[] = [];
    let currentHeadline: DocHeadline | null = null;

    const headlines =
      document.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]");

    headlines.forEach((headline, index) => {
      const id = headline.getAttribute("id");

      if (typeof headline.textContent === "string" && id) {
        if (currentHeadline === null) {
          if (headline.tagName === "H2" || headline.tagName === "H3") {
            currentHeadline = {
              title: headline.textContent,
              id,
              element: "H2",
              children: [],
            };
          }
        } else {
          if (headline.tagName === "H2" || headline.tagName === "H3") {
            tocHeadlines.push(currentHeadline);
            currentHeadline = {
              title: headline.textContent,
              id,
              element: "H2",
              children: [],
            };
          }
        }
        const isLastIterationOfLoop = index === headlines.length - 1;
        if (isLastIterationOfLoop) {
          if (currentHeadline !== null) {
            tocHeadlines.push(currentHeadline);
          }
        }
      }
    });

    setToc(tocHeadlines);
  }, [children, isComponentDoc]);

  return [toc];
};
