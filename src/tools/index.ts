import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { getCurrentWeather } from "./weather";

export const setupTools = (server: McpServer) => {
    getCurrentWeather(server);
}