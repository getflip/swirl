import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { ArtifactLibrary } from "./artifact-library.js";
import { LibraryCache } from "./library-cache.js";
import {
  registerListComponents,
  registerListIcons,
  registerListSymbols,
  registerListEmojis,
} from "./tools/list-components.js";
import { registerGetComponentDetails } from "./tools/get-component-details.js";
import { registerGetStarted } from "./tools/get-started.js";

const cache = new LibraryCache();

async function loadLibrary(version: string): Promise<ArtifactLibrary> {
  const cached = cache.get(version);

  if (cached) {
    return cached;
  }

  try {
    const lib = await ArtifactLibrary.fromRemote(version);

    cache.set(version, lib);

    return lib;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    throw new Error(
      `Version "${version}" not found or failed to load. ` +
        `Make sure the version matches your installed @getflip/swirl-components version. ` +
        `Details: ${message}`
    );
  }
}

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "swirl-mcp",
    version: "0.1.0",
  });

  registerListComponents(server, loadLibrary);
  registerListIcons(server, loadLibrary);
  registerListSymbols(server, loadLibrary);
  registerListEmojis(server, loadLibrary);
  registerGetComponentDetails(server, loadLibrary);
  registerGetStarted(server, loadLibrary);

  return server;
}
