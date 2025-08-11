import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { z } from "zod";

export const reportWeatherNews = (server: McpServer) => {
  server.prompt(
    "weather-news-report",
    {
      message: z.string()
    },
    async ({ message }) => {
      console.log(`Received request: message=${message}`);

      const result = `
You are a professional news anchor. 
Report message as if you are delivering a live news broadcast.

Message:
${message}

Make it concise, factual, and engaging for the audience. 
Avoid technical jargon and keep it under 80 words.
`

      console.log(`Sended response: result=${result}`)
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: result.trim()
            }
          },
        ],
      };
    }
  );
}