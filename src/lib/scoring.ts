import type { Decision, RuleConfig, TradeSignalInput, WalletMetrics } from "@/lib/types";

export function oneHitWonderPenalty(oneHitProfitShare: number): number {
  if (oneHitProfitShare <= 0.35) return 0;
  return Math.min(30, (oneHitProfitShare - 0.35) * 60);
}

export function scoreWallet(wallet: WalletMetrics): number {
  const base =
    wallet.roi30d * 0.18 +
    wallet.consistency * 0.18 +
    wallet.copyability * 0.16 +
    wallet.categoryEdge * 0.12 +
    wallet.liquidityQuality * 0.12 +
    wallet.entryTiming * 0.08 +
    wallet.tradeFrequency * 0.08 +
    wallet.resolvedPerformance * 0.08;

  return Math.max(0, Math.min(100, base - oneHitWonderPenalty(wallet.oneHitProfitShare)));
}

export function scoreTrade(input: TradeSignalInput, rules: RuleConfig): number {
  const move = Math.abs(input.currentMarketPrice - input.walletEntryPrice);
  const priceMovePenalty = move > rules.maxPriceMoveFromEntry ? (move - rules.maxPriceMoveFromEntry) * 100 : 0;
  const spreadPenalty = input.spread > rules.maxSpread ? (input.spread - rules.maxSpread) * 100 : 0;
  const liquidityPenalty = input.liquidity < rules.minLiquidity ? (rules.minLiquidity - input.liquidity) / 1000 : 0;
  const base =
    input.walletGlobalScore * 0.3 +
    input.walletCategoryScore * 0.2 +
    (100 - move * 100) * 0.15 +
    (100 - input.spread * 100) * 0.15 +
    Math.min(100, input.liquidity / 100) * 0.1 +
    Math.max(0, 100 - input.timeToResolutionHours) * 0.05 +
    input.thesisScore * 0.05;
  return Math.max(0, Math.min(100, base - priceMovePenalty - spreadPenalty - liquidityPenalty));
}

export function decisionFromScore(score: number, rules: RuleConfig): Decision {
  if (score >= rules.minCopyScore) return "paper_copy";
  if (score >= rules.watchScore) return "watchlist";
  return "skip";
}
