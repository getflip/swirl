import { DataSource, LocalDataSource, RemoteDataSource } from "./data-source";
import type {
  AgentComponentsIndex,
  AgentTokensIndex,
  ComponentCategory,
  ComponentIndexEntry,
  TokenCategory,
  TokenEntry,
} from "./types";

export class ArtifactLibrary {
  private readonly catalog: ComponentIndexEntry[];
  private readonly tagIndex: Map<string, ComponentIndexEntry>;
  private readonly tokens: AgentTokensIndex;
  private readonly dataSource: DataSource;

  private constructor(
    catalog: ComponentIndexEntry[],
    tokens: AgentTokensIndex,
    dataSource: DataSource
  ) {
    this.catalog = catalog;
    this.tokens = tokens;
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

  getTokensByCategory(category: TokenCategory): TokenEntry[] {
    return this.tokens[category];
  }

  private static async fromDataSource(
    dataSource: DataSource
  ): Promise<ArtifactLibrary> {
    const [components, tokens] = await Promise.all([
      dataSource.readJson<AgentComponentsIndex>("components-index.json"),
      dataSource.readJson<AgentTokensIndex>("tokens.json"),
    ]);

    return new ArtifactLibrary(components.components, tokens, dataSource);
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
