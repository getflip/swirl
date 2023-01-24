import { Action, useRegisterActions } from "kbar";
import { useRouter } from "next/router";
import * as React from "react";
import { NavItem, navItems } from "../navigation";

const searchId = randomId();

export default function useDocsActions() {
  const router = useRouter();

  const searchActions = React.useMemo(() => {
    function collectDocs(navItems: NavItem[]): Action[] {
      return navItems.map((navItem: NavItem) => {
        return {
          id: navItem.title,
          name: navItem.title,
          subtitle: navItem.description,
          perform: () => router.push(navItem.url),
        };
      });
    }
    return collectDocs(navItems);
  }, [router]);

  const rootSearchAction = React.useMemo(
    () =>
      searchActions.length
        ? {
            id: searchId,
            name: "Search docs…",
            shortcut: ["?"],
            keywords: "find",
            section: "Documentation",
          }
        : null,
    [searchActions]
  );
  useRegisterActions(
    [rootSearchAction, ...searchActions].filter(Boolean) as Action[]
  );
}

function randomId() {
  return Math.random().toString(36).substring(2, 9);
}
