import { dashboardData } from "@/lib/dashboard-data";

export default function ReportsPage() {
  const best = dashboardData.wallets[0];
  const worst = dashboardData.wallets[1];
  return (
    <main className="space-y-2 rounded-md border bg-white p-4 text-sm">
      <h2 className="text-xl font-semibold">Reports</h2>
      <p>End-of-day report: {dashboardData.reportStatus}</p>
      <p>Paper PnL today: ${dashboardData.totalPaperPnl.toFixed(2)}</p>
      <p>Best wallet today: {best.label}</p>
      <p>Worst wallet today: {worst.label}</p>
      <p>Rule changes: {dashboardData.latestRuleChanges.join("; ")}</p>
      <p>Tomorrow watch: focus on high-liquidity politics markets only.</p>
    </main>
  );
}
