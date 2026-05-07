/**
 * Agent-facing compact component index (schemaVersion 1)
 */

export interface AgentComponentsIndex {
  schemaVersion: 1;
  components: ComponentIndexEntry[];
}

export interface ComponentIndexEntry {
  tag: string;
  summary: string;
  relatedComponents?: string[];
}

export type ComponentCategory = "core" | "icon" | "symbol";

/**
 * Agent-facing design tokens index (schemaVersion 1)
 */

export type TokenCategory = "colors" | "typography" | "layout";

export interface TokenEntry {
  name: string;
  value?: unknown;
  valueLight?: unknown;
  valueDark?: unknown;
  description?: string;
  tailwindNamespace?: string;
}

export interface AgentTokensIndex {
  schemaVersion: 1;
  colors: TokenEntry[];
  typography: TokenEntry[];
  layout: TokenEntry[];
}
