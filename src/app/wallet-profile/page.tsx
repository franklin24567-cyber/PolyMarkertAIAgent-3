import { dashboardData } from "@/lib/dashboard-data";

export default function WalletProfilePage() {
  const wallet = dashboardData.wallets[0];

  return (
    <main className="space-y-4 rounded-md border bg-white p-4">
      <h2 className="text-xl font-semibold">Wallet Profile: {wallet.label}</h2>
      <ul className="grid gap-2 text-sm sm:grid-cols-2">
        <li>ROI 30d: {wallet.roi30d}</li>
        <li>Win Rate: {(dashboardData.winRate * 100).toFixed(1)}%</li>
        <li>Average Trade Size: $14.2</li>
        <li>Category Strength: {wallet.category}</li>
        <li>Liquidity profile: healthy</li>
        <li>Average entry timing: early-mid</li>
        <li>Copyable: yes</li>
        <li>Risk note: avoid low-liquidity tails</li>
      </ul>
    </main>
  );
}
