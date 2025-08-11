import { OpenMeteo } from "@/repositories";
import { Weather } from "@/usecases";
import { Functions } from "@/utilities";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { z } from "zod";

export const getCurrentWeather = (server: McpServer) => {
  server.tool(
    "get-current-weather",
    "Get the weather of a city",
    {
      city: z.string(),
    },
    async ({ city }) => {
      console.log(`Received request: city=${city}`);
      
      const weather = Weather.getInstance(OpenMeteo.getInstance())
      const { ok, val } = await Functions.wrapAsync<Awaited<ReturnType<typeof weather.getCurrentWeather>>, Error>(() => weather.getCurrentWeather(city))
      if (!ok) {
        return {
          content: [{ type: "text", text: `Error fetching weather data: ${val.message}` }]
        }
      }

      console.log(`Sended response: result=${JSON.stringify(val, null, 2)}`)
      return {
        content: [{ type: "text", text: JSON.stringify(val, null, 2) }],
      };
    }
  );
}