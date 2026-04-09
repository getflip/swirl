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
}
