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

export type ComponentCategory = "core" | "icon" | "symbol" | "emoji";
