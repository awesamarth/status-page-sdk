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

## Development

```bash
bun lint
bun run build
```
