import { NavItem } from "../navigation.model";
import { apiDocsNavItems } from "./apiDocs.data";
import { apiSpecsNavItems } from "./apiSpecs.data";

export const apiNavItems: NavItem[] = [...apiDocsNavItems, ...apiSpecsNavItems];
