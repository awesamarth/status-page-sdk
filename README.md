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

## Environment configuration

The demo dashboard uses mock data by default. To point it at a real status-page API, set the `STATUS_PAGE_BASE_URL` environment variable before running the app:

```bash
STATUS_PAGE_BASE_URL=https://status.example.com/api bun dev
```

When `STATUS_PAGE_BASE_URL` is set, the demo sends all client requests to that base URL instead of the built-in mock data. Leave it unset to continue using mock data.

## Development

```bash
bun lint
bun run build
```
