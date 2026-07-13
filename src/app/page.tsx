import { dashboardData } from "@/lib/dashboard-data";

export default function Page() {
  return (
    <main className="space-y-6">
      {dashboardData.demoMode && <p className="rounded-md bg-amber-100 px-3 py-2 text-sm">Demo data shown. Connect APIs for live data.</p>}
      <section className="grid gap-3 sm:grid-cols-3">
        <Metric label="Total paper PnL" value={`$${dashboardData.totalPaperPnl.toFixed(2)}`} />
        <Metric label="Win rate" value={`${(dashboardData.winRate * 100).toFixed(1)}%`} />
        <Metric label="Open positions" value={String(dashboardData.openPositions)} />
        <Metric label="Tracked wallets" value={String(dashboardData.activeTrackedWallets)} />
        <Metric label="Copy candidates today" value={String(dashboardData.copyCandidatesToday)} />
        <Metric label="Report status" value={dashboardData.reportStatus} />
      </section>
      <section className="rounded-md border bg-white p-4">
        <h2 className="font-semibold">Latest rule change</h2>
        <p className="text-sm text-zinc-700">{dashboardData.latestRuleChanges[0]}</p>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-white p-4">
      <p className="text-xs uppercase text-zinc-500">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
