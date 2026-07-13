import { fetchLeaderboard } from "@/lib/adapters/leaderboard";
import { runJob } from "./common";
runJob("scan:leaderboard", async () => { const data = await fetchLeaderboard(500); console.log("leaderboard rows", Array.isArray(data) ? data.length : Object.keys(data ?? {}).length); });
