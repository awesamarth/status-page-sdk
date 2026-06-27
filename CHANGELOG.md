# Changelog

## [0.1.0] - 2026-06-28

Initial SDK surface:

- `createStatusClient(options)` — typed client factory; accepts `baseUrl` and optional `apiKey`.
- `client.getServices(): Promise<StatusService[]>` — all monitored services.
- `client.getIncidents(): Promise<Incident[]>` — all known incidents.
- `client.getIncident(id: string): Promise<Incident | null>` — one incident by id or `null` if not found.
- `client.getSummary(): Promise<StatusSummary>` — overall state, active incident count, and services.
- Exported types: `StatusService`, `Incident`, `ServiceState`, `StatusClientOptions`, `StatusSummary`, `StatusClient`.
- Demo Next.js app shipped with mock data (no external credentials required).
