export async function fetchMarketSnapshots() {
  const base = process.env.POLYMARKET_API_BASE;
  if (!base) {
    throw new Error("POLYMARKET_API_BASE is required for live market scans.");
  }

  const response = await fetch(`${base}/markets`);
  if (!response.ok) {
    throw new Error(`Polymarket API failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
