# Status Page SDK

A tiny TypeScript SDK and Next.js demo for reading service health from a status-page API. The current implementation uses
mock data so the package can run without external credentials.

## Install

```bash
bun install
```

## Run the demo

```bash
bun dev
```

Open `http://localhost:3000` to view the demo dashboard.

## SDK usage

```ts
import { createStatusClient } from "./src/lib/status-client";

const status = createStatusClient({
  baseUrl: "https://status.example.com/api",
});

const services = await status.getServices();
const incident = await status.getIncident("inc_1042");
const summary = await status.getSummary();
```

## Available methods

- `getServices()` returns all monitored services.
- `getIncidents()` returns known incidents.
- `getIncident(id)` returns one incident or `null`.
- `getSummary()` returns overall state, incident count, and services.

## Troubleshooting mock data

If the dashboard only shows mock status data, it means `createStatusClient` is falling back to the bundled mock transport because no `baseUrl` was provided. To target a real endpoint, pass `baseUrl` when creating the status client:

```ts
const status = createStatusClient({
  baseUrl: "https://status.example.com/api",
  apiKey: "your-api-key", // optional
});
```

Omitting `baseUrl` causes the client to use the mock transport, so the dashboard will always display bundled demo data instead of live status information.

## Development

```bash
bun lint
bun run build
```
