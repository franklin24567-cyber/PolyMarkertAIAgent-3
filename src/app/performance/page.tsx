import { dashboardData } from "@/lib/dashboard-data";

export default function PerformancePage() {
  const b = dashboardData.benchmark;
  return (
    <main className="space-y-3 rounded-md border bg-white p-4 text-sm">
      <h2 className="text-xl font-semibold">Performance</h2>
      <p>Bot-filtered PnL: ${b.bot.toFixed(2)} vs Blind copy: ${b.blind.toFixed(2)}</p>
      <p>Watchlist: ${b.watch.toFixed(2)} | Skipped: ${b.skipped.toFixed(2)}</p>
      <p>Missed winners: {b.missedWinners} | Avoided losers: {b.avoidedLosers}</p>
      <p>Result: {b.botBeatBlind ? "Bot strategy outperformed blind copy." : "Bot strategy underperformed blind copy."}</p>
    </main>
  );
}
