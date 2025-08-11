import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { config } from "dotenv";
import express from "express";
import { setupPrompts } from "./prompts";
import { setupTools } from "./tools";
import { setupTransports } from "./transports";

config();

const server = new McpServer({
  name: "weather-mcp-server",
  version: "1.0.0",
});
setupPrompts(server)
setupTools(server)

const app = express();
setupTransports(server, app)

const port = process.env.PORT || "3000";
app.listen(+port, () => {
  console.log(`MCP server is running on port ${port}`);
});