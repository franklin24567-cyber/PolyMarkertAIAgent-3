import { DEFAULT_RULES } from "@/lib/defaults";
import { nextRuleSet } from "@/lib/rules";
import { runJob } from "./common";

runJob("update:rules", async () => {
  const updated = nextRuleSet(DEFAULT_RULES, {
    spreadHeavyLossRate: 0.6,
    lowLiquidityLossRate: 0.2,
    lateEntryLossRate: 0.62,
  });

  console.log(updated);
});
