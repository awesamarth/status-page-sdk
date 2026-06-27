export type ServiceState = "operational" | "degraded" | "outage";

export type StatusService = {
  id: string;
  name: string;
  state: ServiceState;
  uptimePct: number;
  updatedAt: string;
};

export type Incident = {
  id: string;
  serviceId: string;
  title: string;
  state: "investigating" | "identified" | "monitoring" | "resolved";
  impact: "minor" | "major" | "critical";
  openedAt: string;
  updates: Array<{
    body: string;
    createdAt: string;
  }>;
};

export const mockServices: StatusService[] = [
  {
    id: "api",
    name: "Public API",
    state: "operational",
    uptimePct: 99.98,
    updatedAt: "2026-06-28T03:15:00.000Z",
  },
  {
    id: "dashboard",
    name: "Customer Dashboard",
    state: "degraded",
    uptimePct: 99.91,
    updatedAt: "2026-06-28T03:12:00.000Z",
  },
  {
    id: "webhooks",
    name: "Webhook Delivery",
    state: "operational",
    uptimePct: 99.95,
    updatedAt: "2026-06-28T03:10:00.000Z",
  },
];

export const mockIncidents: Incident[] = [
  {
    id: "inc_1042",
    serviceId: "dashboard",
    title: "Elevated latency on dashboard charts",
    state: "monitoring",
    impact: "minor",
    openedAt: "2026-06-28T02:42:00.000Z",
    updates: [
      {
        body: "Chart queries are recovering after cache warmup.",
        createdAt: "2026-06-28T03:03:00.000Z",
      },
      {
        body: "We identified slow aggregation queries in the dashboard metrics path.",
        createdAt: "2026-06-28T02:51:00.000Z",
      },
    ],
  },
];
