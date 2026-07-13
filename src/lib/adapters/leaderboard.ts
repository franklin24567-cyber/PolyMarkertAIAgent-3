export async function fetchLeaderboard(limit = 500) {
  const base = process.env.LEADERBOARD_API_BASE;
  if (!base) {
    throw new Error("LEADERBOARD_API_BASE is required for live leaderboard scans.");
  }

  const response = await fetch(`${base}/leaderboard?limit=${limit}`);
  if (!response.ok) {
    throw new Error(`Leaderboard API failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
