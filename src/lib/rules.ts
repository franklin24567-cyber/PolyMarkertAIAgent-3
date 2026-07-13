import type { RuleConfig } from "@/lib/types";

export interface RulePerformance {
  spreadHeavyLossRate: number;
  lowLiquidityLossRate: number;
  lateEntryLossRate: number;
}

export function nextRuleSet(current: RuleConfig, performance: RulePerformance): RuleConfig {
  const next = { ...current };

  if (performance.spreadHeavyLossRate > 0.55) {
    next.maxSpread = Math.max(0.01, current.maxSpread - 0.01);
  }

  if (performance.lowLiquidityLossRate > 0.55) {
    next.minLiquidity = current.minLiquidity + 200;
  }

  if (performance.lateEntryLossRate > 0.55) {
    next.maxPriceMoveFromEntry = Math.max(0.02, current.maxPriceMoveFromEntry - 0.01);
  }

  return next;
}
