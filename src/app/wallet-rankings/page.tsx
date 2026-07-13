import { dashboardData } from "@/lib/dashboard-data";

export default function WalletRankingsPage() {
  return (
    <main className="rounded-md border bg-white p-4">
      <h2 className="mb-3 text-xl font-semibold">Wallet Rankings</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-zinc-500">
            <th>Rank</th><th>Wallet</th><th>ROI</th><th>Consistency</th><th>Copyability</th><th>Penalty</th><th>Best Category</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dashboardData.wallets.map((wallet) => (
            <tr key={wallet.address} className="border-t">
              <td>{wallet.sourceRank}</td><td>{wallet.address}</td><td>{wallet.roi30d}</td><td>{wallet.consistency}</td><td>{wallet.copyability}</td><td>{(wallet.oneHitProfitShare * 100).toFixed(0)}%</td><td>{wallet.category}</td><td>{wallet.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
