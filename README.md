# weather-mcp-server

> A Model Context Protocol (MCP) server providing real-time weather data and news reports via OpenMeteo API.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Overview

`weather-mcp-server` is a Node.js/TypeScript server implementing the Model Context Protocol (MCP). It fetches weather data for any city using the OpenMeteo API and delivers concise, engaging weather news reports. The server exposes tools and prompts for integration with MCP clients.

## Features

- Real-time weather data retrieval for any city
- Weather news reporting in broadcast style
- MCP-compliant server with Express transport
- Type-safe API using Zod validation
- Modular codebase for easy extension

## Installation

```bash
git clone https://github.com/your-org/weather-mcp-server.git
cd weather-mcp-server
cp .env.example .env # Set your PORT if needed
npm install
npm run build
```

## Usage

Development mode (auto-reload):

```bash
npm run start:dev
```

The MCP server will run on the port specified in `.env` (default: 3000).

## Docker Build & Debug (Taskfile)

This project uses [Taskfile](https://taskfile.dev) for Docker image build and debug automation.

### Build Docker Image
```bash
task build:image
```
Builds the Docker image using buildx and tags it with both the version and `latest`.

### Debug Docker Image
```bash
task debug:image
```
Runs the Docker image in interactive mode with Bash, loads environment variables from `.env`, and adds `host.docker.internal:host-gateway` for easy host-container communication.

**Requirements:**
- Docker
- Taskfile CLI

## API

### Tools

- `get-current-weather`
	- **Description:** Get the weather of a city.
	- **Input:** `{ city: string }`
	- **Output:** Weather details (temperature, humidity, dew point, description).

### Prompts

- `weather-news-report`
	- **Description:** Returns a concise, broadcast-style weather news report for a given message.

### HTTP Endpoints

- `POST /mcp` — Main MCP endpoint for requests
- `GET /mcp` and `DELETE /mcp` — Not supported (returns 405)

## Contributing

Pull requests and issues are welcome! Please follow conventional TypeScript/Node.js best practices.

## License

MIT
