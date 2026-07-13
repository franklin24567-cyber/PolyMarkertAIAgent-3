import { dashboardData } from "@/lib/dashboard-data";

export default function PaperTradesPage() {
  return (
    <main className="rounded-md border bg-white p-4">
      <h2 className="mb-3 text-xl font-semibold">Paper Trades</h2>
      {dashboardData.paperTrades.map((trade) => (
        <div key={trade.marketQuestion} className="mb-2 rounded-md border p-3 text-sm">
          <p className="font-medium">{trade.marketQuestion}</p>
          <p>Simulated size: ${trade.simulatedPositionSize} | Status: {trade.status} | Hourly PnL: ${trade.pnl}</p>
        </div>
      ))}
    </main>
  );
}
