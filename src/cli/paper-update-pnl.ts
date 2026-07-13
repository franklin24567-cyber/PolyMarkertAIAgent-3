import { updateHourlyPnl } from "@/lib/paper-trading";
import { runJob } from "./common";

runJob("paper:update-pnl", async () => {
  console.log(updateHourlyPnl(0.4, [0.41, 0.39, 0.46], 10, "YES"));
});
