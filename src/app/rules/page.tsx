import { dashboardData } from "@/lib/dashboard-data";

export default function RulesPage() {
  const rules = dashboardData.rules;
  return (
    <main className="rounded-md border bg-white p-4 text-sm">
      <h2 className="mb-2 text-xl font-semibold">Rules</h2>
      <p>Active version: v1</p>
      <ul className="list-disc pl-6">
        <li>Max spread: {rules.maxSpread}</li>
        <li>Min liquidity: {rules.minLiquidity}</li>
        <li>Max price move from wallet entry: {rules.maxPriceMoveFromEntry}</li>
        <li>Paper-copy threshold: {rules.minCopyScore}</li>
        <li>Watchlist threshold: {rules.watchScore}</li>
      </ul>
      <p className="mt-2">Automatic change log keeps before/after values with evidence summary.</p>
    </main>
  );
}
