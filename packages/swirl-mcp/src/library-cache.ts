import type { ArtifactLibrary } from "./artifact-library";

/**
 * In-memory LRU cache for ArtifactLibrary instances keyed by version string.
 */
export class LibraryCache {
  private readonly cache = new Map<string, ArtifactLibrary>();
  private readonly maxSize: number;

  constructor(maxSize = 20) {
    this.maxSize = maxSize;
  }

  get(version: string): ArtifactLibrary | undefined {
    const lib = this.cache.get(version);

    if (lib) {
      // Move to end (most recently used)
      this.cache.delete(version);
      this.cache.set(version, lib);
    }
    return lib;
  }

  set(version: string, lib: ArtifactLibrary): void {
    if (this.cache.has(version)) {
      this.cache.delete(version);
    } else if (this.cache.size >= this.maxSize) {
      const oldest = this.cache.keys().next().value!;

      // Evict oldest
      this.cache.delete(oldest);
    }
    this.cache.set(version, lib);
  }
}
