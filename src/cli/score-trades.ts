import { DEFAULT_RULES } from "@/lib/defaults";
import { decisionFromScore, scoreTrade } from "@/lib/scoring";
import { runJob } from "./common";

runJob("score:trades", async () => {
  const score = scoreTrade(
    {
      walletGlobalScore: 81,
      walletCategoryScore: 77,
      walletEntryPrice: 0.42,
      currentMarketPrice: 0.46,
      spread: 0.02,
      liquidity: 7000,
      timeToResolutionHours: 40,
      thesisScore: 82,
    },
    DEFAULT_RULES,
  );

  console.log({ score, decision: decisionFromScore(score, DEFAULT_RULES) });
});
