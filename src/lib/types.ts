export type WalletStatus = "track" | "watch" | "ignore";
export type Decision = "paper_copy" | "watchlist" | "skip";

export interface WalletMetrics {
  roi30d: number;
  consistency: number;
  copyability: number;
  categoryEdge: number;
  liquidityQuality: number;
  entryTiming: number;
  tradeFrequency: number;
  resolvedPerformance: number;
  oneHitProfitShare: number;
}

export interface TradeSignalInput {
  walletGlobalScore: number;
  walletCategoryScore: number;
  walletEntryPrice: number;
  currentMarketPrice: number;
  spread: number;
  liquidity: number;
  timeToResolutionHours: number;
  thesisScore: number;
}

export interface RuleConfig {
  maxSpread: number;
  minLiquidity: number;
  maxPriceMoveFromEntry: number;
  minCopyScore: number;
  watchScore: number;
}

export interface PaperTradeInput {
  decision: Decision;
  confidence: number;
  entryPrice: number;
  currentPrice: number;
  position: "YES" | "NO";
}
