import { createServer } from "node:http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

import { createMcpServer } from "../create-server.js";

const PORT = Number(process.env.PORT ?? 3000);

const httpServer = createServer(async (req, res) => {
  // Health check
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  // MCP endpoint — stateless mode: each request gets a fresh server + transport
  if (req.method === "POST" && req.url === "/mcp") {
    try {
      const mcpServer = createMcpServer();

      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined, // stateless
      });

      await mcpServer.connect(transport);
      await transport.handleRequest(req, res);

      // Clean up after the request is handled
      res.on("close", () => {
        transport.close().catch(() => {});
        mcpServer.close().catch(() => {});
      });
    } catch (error) {
      console.error("MCP request error:", error);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal server error" }));
      }
    }
    return;
  }

  // Reject other methods on /mcp
  if (req.url === "/mcp") {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "Method not allowed. Use POST for MCP requests.",
      })
    );
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

httpServer.listen(PORT, () => {
  console.error(`Swirl MCP HTTP Server listening on port ${PORT}`);
  console.error(`  MCP endpoint: POST http://localhost:${PORT}/mcp`);
  console.error(`  Health check: GET  http://localhost:${PORT}/health`);
});
