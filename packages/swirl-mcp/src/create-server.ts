import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { ArtifactLibrary } from "./artifact-library.js";
import { LibraryCache } from "./library-cache.js";
import {
  registerListComponents,
  registerListIcons,
  registerListSymbols,
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

const INSTRUCTIONS = `The authoritative source for the Swirl design system (@getflip/swirl-components).
Covers components, icons, symbols, and usage guidance.

For any task involving Swirl — a swirl-* component (e.g. swirl-button,
swirl-file-chip), an icon or the design system in general —
you MUST call the appropriate tool on this server BEFORE reading Swirl
source files, grepping the repo, or searching the web. Do not infer
component APIs, prop names, token values, or icon names from source code,
type definitions, or memory — they may be outdated. This server is the
source of truth.`;

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "swirl-mcp",
    version: "0.1.0",
  }, {
    instructions: INSTRUCTIONS,
  });

  registerListComponents(server, loadLibrary);
  registerListIcons(server, loadLibrary);
  registerListSymbols(server, loadLibrary);
  registerGetComponentDetails(server, loadLibrary);
  registerGetStarted(server, loadLibrary);

  return server;
}
