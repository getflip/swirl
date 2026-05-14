import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import pkg from "../package.json" with { type: "json" };
import { ArtifactLibrary } from "./artifact-library.js";
import { LibraryCache } from "./library-cache.js";
import { registerGetComponentDetails } from "./tools/get-component-details.js";
import { registerGetComponentSource } from "./tools/get-component-source.js";
import { registerGetStarted } from "./tools/get-started.js";
import {
  registerListComponents,
  registerListIcons,
  registerListSymbols,
} from "./tools/list-components.js";

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

const INSTRUCTIONS = `Use this server as the authoritative, version-aware source for the Swirl design system (@getflip/swirl-components).

If a project has @getflip/swirl-components installed, use Swirl as the default
UI system for all UI work. Prefer Swirl components, icons, symbols, tokens, and
documented patterns over custom UI. Only build custom UI when no suitable Swirl
component or pattern exists.

For any UI task in a project that uses Swirl, call the appropriate Swirl MCP
tool before choosing or implementing UI. Do not infer component APIs, prop names,
token values, icon names, or usage patterns from memory.

Use get_component_details for documented component APIs, accessibility guidance,
slots, events, examples, and related components. When behavior, styling, layout,
rendering details, debugging, or uncertainty requires the full picture, use
get_component_source to read the versioned original source and styles for the
specific component as well.

Every tool requires a 'version' parameter matching the project's
installed @getflip/swirl-components version. Read it from the user's
package.json (or node_modules/@getflip/swirl-components/package.json)
before the first tool call and reuse it for subsequent calls.`;

export function createMcpServer(): McpServer {
  const server = new McpServer(
    {
      name: "swirl-mcp",
      version: pkg.version,
    },
    {
      instructions: INSTRUCTIONS,
    }
  );

  registerListComponents(server, loadLibrary);
  registerListIcons(server, loadLibrary);
  registerListSymbols(server, loadLibrary);
  registerGetComponentDetails(server, loadLibrary);
  registerGetComponentSource(server, loadLibrary);
  registerGetStarted(server, loadLibrary);

  return server;
}
