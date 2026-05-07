import { DataSource, LocalDataSource, RemoteDataSource } from "./data-source";
import type {
  AgentComponentsIndex,
  ComponentCategory,
  ComponentIndexEntry,
} from "./types";

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
    return ArtifactLibrary.fromDataSource(new RemoteDataSource(version));
  }

  /**
   * Load artifacts from the local monorepo (`packages/swirl-ai/dist` and
   * `packages/swirl-components/src`) for development against an unpublished
   * swirl-ai build.
   */
  static async fromLocal(): Promise<ArtifactLibrary> {
    return ArtifactLibrary.fromDataSource(new LocalDataSource());
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

  async getComponentSource(
    tag: string
  ): Promise<Record<"tsx" | "css", string | undefined>> {
    return this.dataSource.readComponentSource(tag);
  }

  async getGuide(name: string): Promise<string | undefined> {
    return this.dataSource.readText(`${name}.md`);
  }

  private static async fromDataSource(
    dataSource: DataSource
  ): Promise<ArtifactLibrary> {
    const [components] = await Promise.all([
      dataSource.readJson<AgentComponentsIndex>("components-index.json"),
    ]);

    return new ArtifactLibrary(components.components, dataSource);
  }
}

function categorize(tag: string): ComponentCategory {
  if (tag.startsWith("swirl-icon-")) {
    return "icon";
  }
  if (tag.startsWith("swirl-symbol-")) {
    return "symbol";
  }
  return "core";
}
