import { createStatusClient } from "@/lib/status-client";

const stateStyles = {
  degraded: "border-amber-300 bg-amber-50 text-amber-900",
  operational: "border-emerald-300 bg-emerald-50 text-emerald-900",
  outage: "border-red-300 bg-red-50 text-red-900",
};

export default async function Home() {
  const client = createStatusClient();
  const [summary, incidents] = await Promise.all([client.getSummary(), client.getIncidents()]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <div className="mx-auto grid max-w-5xl gap-6">
        <header className="border border-slate-800 bg-slate-900 p-6">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-400">Status Page SDK</p>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Service health, from one tiny SDK.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                This demo app uses mock status data through a typed client. It is intentionally small so maintenance
                agents can update docs, changelogs, and examples quickly.
              </p>
            </div>
            <span className={`w-fit border px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] ${stateStyles[summary.overallState]}`}>
              {summary.overallState}
            </span>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {summary.services.map((service) => (
            <article className="border border-slate-800 bg-slate-900 p-4" key={service.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold">{service.name}</h2>
                  <p className="mt-1 font-mono text-xs text-slate-500">{service.id}</p>
                </div>
                <span className={`border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.16em] ${stateStyles[service.state]}`}>
                  {service.state}
                </span>
              </div>
              <p className="mt-5 text-3xl font-semibold">{service.uptimePct}%</p>
              <p className="mt-1 text-xs text-slate-500">30-day uptime</p>
            </article>
          ))}
        </section>

        <section className="border border-slate-800 bg-slate-900 p-5">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-slate-500">Active incidents</p>
          <h2 className="mt-2 text-xl font-semibold">{summary.incidentCount} open incident</h2>
          <div className="mt-5 grid gap-3">
            {incidents.map((incident) => (
              <article className="border border-slate-800 bg-slate-950 p-4" key={incident.id}>
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-medium">{incident.title}</h3>
                    <p className="mt-1 font-mono text-xs text-slate-500">
                      {incident.id} / {incident.serviceId}
                    </p>
                  </div>
                  <span className="w-fit border border-slate-700 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-300">
                    {incident.state}
                  </span>
                </div>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-400">
                  {incident.updates.map((update) => (
                    <li className="border-l border-slate-700 pl-3" key={update.createdAt}>
                      {update.body}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
