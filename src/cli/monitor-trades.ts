import { fetchMarketSnapshots } from "@/lib/adapters/polymarket";
import { runJob } from "./common";

runJob("monitor:trades", async () => {
  const data = await fetchMarketSnapshots();
  const payload = Array.isArray(data) ? data.length : typeof data;

  console.log("market snapshot payload", payload);
});
