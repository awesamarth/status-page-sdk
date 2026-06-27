import { mockIncidents, mockServices, type Incident, type StatusService } from "./mock-status";

export type StatusClientOptions = {
  apiKey?: string;
  baseUrl?: string;
};

export type StatusSummary = {
  incidentCount: number;
  overallState: StatusService["state"];
  services: StatusService[];
};

export function createStatusClient(options: StatusClientOptions = {}) {
  const baseUrl = options.baseUrl ?? "mock://status-page-sdk";

  return {
    baseUrl,
    async getIncident(id: string): Promise<Incident | null> {
      return mockIncidents.find((incident) => incident.id === id) ?? null;
    },
    async getIncidents(): Promise<Incident[]> {
      return mockIncidents;
    },
    async getServices(): Promise<StatusService[]> {
      return mockServices;
    },
    async getSummary(): Promise<StatusSummary> {
      return {
        incidentCount: mockIncidents.filter((incident) => incident.state !== "resolved").length,
        overallState: computeOverallState(mockServices),
        services: mockServices,
      };
    },
  };
}

function computeOverallState(services: StatusService[]): StatusService["state"] {
  if (services.some((service) => service.state === "outage")) return "outage";
  if (services.some((service) => service.state === "degraded")) return "degraded";
  return "operational";
}

export type StatusClient = ReturnType<typeof createStatusClient>;
