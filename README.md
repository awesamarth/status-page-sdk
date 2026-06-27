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

// Optional: provide your own `baseUrl` and `apiKey`.
// If omitted, the client falls back to built-in mock data at `mock://status-page-sdk`.
const status = createStatusClient({
  baseUrl: "https://status.example.com/api",
  apiKey: "your-api-key",
});

const services = await status.getServices();
const incident = await status.getIncident("inc_1042"); // Incident | null
const summary = await status.getSummary();
```

## Available methods

- `getServices(): Promise<StatusService[]>` — returns all monitored services.
- `getIncidents(): Promise<Incident[]>` — returns all known incidents.
- `getIncident(id: string): Promise<Incident | null>` — returns one incident by id or `null` if not found.
- `getSummary(): Promise<StatusSummary>` — returns overall state, active incident count, and services.

## Data mode

This version ships with mock data only — no external credentials or network calls are needed. Providers other than the built-in mock can be added by supplying a real `baseUrl` (and `apiKey` if required).

## Exported types

- `StatusService`
- `Incident`
- `ServiceState` (`"operational" | "degraded" | "outage"`)
- `StatusClientOptions`
- `StatusSummary`
- `StatusClient`

## Development

```bash
bun lint
bun run build
```
