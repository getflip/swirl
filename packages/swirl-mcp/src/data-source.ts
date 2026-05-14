export class DataSource {
  constructor(private readonly version: string) {}

  async readJson<T>(relativePath: string): Promise<T> {
    const url = `${this.baseUrl}/${relativePath}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${res.status} ${res.statusText}`
      );
    }

    return (await res.json()) as T;
  }

  async readText(relativePath: string): Promise<string | undefined> {
    const url = `${this.baseUrl}/${relativePath}`;
    return this.readTextUrl(url);
  }

  async readComponentSource(
    tag: string
  ): Promise<Record<"tsx" | "css", string | undefined>> {
    const componentPath = `packages/swirl-components/src/components/${tag}/${tag}`;

    const [tsx, css] = await Promise.all([
      this.readTextUrl(`${this.sourceBaseUrl}/${componentPath}.tsx`),
      this.readTextUrl(`${this.sourceBaseUrl}/${componentPath}.css`),
    ]);

    return { tsx, css };
  }

  private async readTextUrl(url: string): Promise<string | undefined> {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        return undefined;
      }

      return await res.text();
    } catch {
      return undefined;
    }
  }

  private get baseUrl(): string {
    return `https://unpkg.com/@getflip/swirl-ai@${this.version}/dist/agent`;
  }

  private get sourceBaseUrl(): string {
    return `https://raw.githubusercontent.com/getflip/swirl/@getflip/swirl-components@${this.version}`;
  }
}
