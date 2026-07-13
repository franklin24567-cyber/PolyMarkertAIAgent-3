import { dashboardData } from "@/lib/dashboard-data";

export default function TradeSignalsPage() {
  return (
    <main className="rounded-md border bg-white p-4">
      <h2 className="mb-3 text-xl font-semibold">Trade Signals</h2>
      <div className="space-y-3 text-sm">
        {dashboardData.decisions.map((signal) => (
          <div key={signal.id} className="rounded-md border p-3">
            <p className="font-medium">{signal.marketQuestion}</p>
            <p>Entry {signal.walletEntryPrice} → Current {signal.currentPrice} | Spread {signal.spread} | Liquidity {signal.liquidity}</p>
            <p>Decision: <strong>{signal.decision}</strong> (score {signal.score.toFixed(1)}) — {signal.reason}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
