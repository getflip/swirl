import type {
  AgentComponentsIndex,
  ComponentCategory,
  ComponentIndexEntry,
} from "./types";
import { DataSource } from "./data-source";

export class ArtifactLibrary {
  private readonly catalog: ComponentIndexEntry[];
  private readonly tagIndex: Map<string, ComponentIndexEntry>;
  private readonly dataSource: DataSource;

  private constructor(catalog: ComponentIndexEntry[], dataSource: DataSource) {
    this.catalog = catalog;
    this.dataSource = dataSource;

    this.tagIndex = new Map();
    for (const entry of this.catalog) {
      this.tagIndex.set(entry.tag, entry);
    }
  }

  /**
   * Load artifacts from a remote base URL (CDN).
   */
  static async fromRemote(version: string): Promise<ArtifactLibrary> {
    const ds = new DataSource(version);
    const json = await ds.readJson<AgentComponentsIndex>(
      "components-index.json"
    );
    return new ArtifactLibrary(json.components, ds);
  }

  getByCategory(category: ComponentCategory): ComponentIndexEntry[] {
    return this.catalog.filter((c) => categorize(c.tag) === category);
  }

  getByTag(tag: string): ComponentIndexEntry | undefined {
    return this.tagIndex.get(tag);
  }

  async getComponentMarkdown(tag: string): Promise<string | undefined> {
    return this.dataSource.readText(`components/${tag}.md`);
  }

  async getGuide(name: string): Promise<string | undefined> {
    return this.dataSource.readText(`${name}.md`);
  }
}

function categorize(tag: string): ComponentCategory {
  if (tag.startsWith("swirl-icon-")) {
    return "icon";
  }
  if (tag.startsWith("swirl-symbol-")) {
    return "symbol";
  }
  if (tag.startsWith("swirl-emoji-")) {
    return "emoji";
  }
  return "core";
}
