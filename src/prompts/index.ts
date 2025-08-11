import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { reportWeatherNews } from "./weather";

export const setupPrompts = (server: McpServer) => {
    reportWeatherNews(server);
}