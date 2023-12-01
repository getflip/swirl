import { NavItem } from "@swirl/lib/navigation";
import {
  ListItemProps,
  ExpandableNavGroup,
  NestedNavGroup,
  TopLevelNavLink,
  NestedNavLink,
} from "./ListItems";

const COMPONENT_STRATEGY = {
  TOP_LEVEL_NAV_LINK: "TOP_LEVEL_NAV_LINK",
  EXPANDABLE_NAV_GROUP: "EXPANDABLE_NAV_GROUP",
  NESTED_NAV_GROUP: "NESTED_NAV_GROUP",
  NESTED_NAV_LINK: "NESTED_NAV_LINK",
} as const;

function determineComponentStrategy(
  item: NavItem,
  hasParent: boolean
): keyof typeof COMPONENT_STRATEGY {
  if (item.children) {
    return hasParent ? "NESTED_NAV_GROUP" : "EXPANDABLE_NAV_GROUP";
  }
  return hasParent ? "NESTED_NAV_LINK" : "TOP_LEVEL_NAV_LINK";
}

export default function ListItemStrategy({
  ariaId,
  item,
  hasParent,
  currentPath,
  handleCloseMenu,
}: ListItemProps) {
  const componentByStrategy = {
    [COMPONENT_STRATEGY.EXPANDABLE_NAV_GROUP]: () => (
      <ExpandableNavGroup
        item={item}
        currentPath={currentPath}
        ariaId={ariaId}
        handleCloseMenu={handleCloseMenu}
      />
    ),
    [COMPONENT_STRATEGY.NESTED_NAV_GROUP]: () => (
      <NestedNavGroup
        item={item}
        currentPath={currentPath}
        ariaId={ariaId}
        handleCloseMenu={handleCloseMenu}
      />
    ),
    [COMPONENT_STRATEGY.TOP_LEVEL_NAV_LINK]: () => (
      <TopLevelNavLink
        item={item}
        currentPath={currentPath}
        handleCloseMenu={handleCloseMenu}
        ariaId={ariaId}
      />
    ),
    [COMPONENT_STRATEGY.NESTED_NAV_LINK]: () => (
      <NestedNavLink
        item={item}
        currentPath={currentPath}
        ariaId={ariaId}
        handleCloseMenu={handleCloseMenu}
      />
    ),
  };

  return componentByStrategy[
    determineComponentStrategy(item, hasParent ? hasParent : false)
  ]();
}
