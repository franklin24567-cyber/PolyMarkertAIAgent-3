import { dashboardData } from "@/lib/dashboard-data";

export default function ReportsPage() {
  const bestWallet = [...dashboardData.wallets].sort((a, b) => b.globalScore - a.globalScore)[0];
  const worstWallet = [...dashboardData.wallets].sort((a, b) => a.globalScore - b.globalScore)[0];

  return (
    <main className="space-y-2 rounded-md border bg-white p-4 text-sm">
      <h2 className="text-xl font-semibold">Reports</h2>
      <p>End-of-day report: {dashboardData.reportStatus}</p>
      <p>Paper PnL today: ${dashboardData.totalPaperPnl.toFixed(2)}</p>
      <p>Best wallet today: {bestWallet.label}</p>
      <p>Worst wallet today: {worstWallet.label}</p>
      <p>Rule changes: {dashboardData.latestRuleChanges.join("; ")}</p>
      <p>Tomorrow watch: focus on high-liquidity politics markets only.</p>
    </main>
  );
}
