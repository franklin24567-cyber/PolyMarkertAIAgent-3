import { dashboardData } from "@/lib/dashboard-data";

export default function DecisionJournalPage() {
  return (
    <main className="space-y-3 rounded-md border bg-white p-4">
      <h2 className="text-xl font-semibold">Decision Journal</h2>
      {dashboardData.decisions.map((d) => (
        <article key={d.id} className="rounded-md border p-3 text-sm">
          <p className="font-medium">{d.marketQuestion}</p>
          <p>Decision: {d.decision} | Score: {d.score.toFixed(1)}</p>
          <p>Risk: spread/liquidity timing check.</p>
          <p>Lesson: {d.decision === "skip" ? "Wait for cleaner entries." : "Signal aligns with wallet edge."}</p>
        </article>
      ))}
    </main>
  );
}
