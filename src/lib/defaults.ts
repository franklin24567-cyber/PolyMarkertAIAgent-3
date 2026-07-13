import type { RuleConfig } from "@/lib/types";

export const DEFAULT_RULES: RuleConfig = {
  maxSpread: 0.05,
  minLiquidity: 3000,
  maxPriceMoveFromEntry: 0.12,
  minCopyScore: 72,
  watchScore: 55,
};
