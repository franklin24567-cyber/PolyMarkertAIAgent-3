import { describe, expect, it } from "vitest";
import { compareBenchmarks } from "@/lib/benchmark";
import { createPaperTrade, simulatedPositionSize, updateHourlyPnl } from "@/lib/paper-trading";
import { bumpRuleVersion, nextRuleSet } from "@/lib/rules";
import { decisionFromScore, oneHitWonderPenalty, scoreTrade, scoreWallet } from "@/lib/scoring";
import { assertPaperOnlySafety, executeRealTrade } from "@/lib/safety";

describe("wallet scoring", () => {
  it("scores wallet with balanced inputs", () => {
    const score = scoreWallet({ roi30d: 80, consistency: 78, copyability: 76, categoryEdge: 70, liquidityQuality: 72, entryTiming: 68, tradeFrequency: 64, resolvedPerformance: 73, oneHitProfitShare: 0.24 });
    expect(score).toBeGreaterThan(60);
  });

  it("applies one-hit-wonder penalty", () => {
    expect(oneHitWonderPenalty(0.8)).toBeGreaterThan(oneHitWonderPenalty(0.3));
  });

  it("accounts for copyability in wallet score", () => {
    const lowCopyability = scoreWallet({ roi30d: 80, consistency: 80, copyability: 20, categoryEdge: 70, liquidityQuality: 70, entryTiming: 70, tradeFrequency: 70, resolvedPerformance: 70, oneHitProfitShare: 0.2 });
    const highCopyability = scoreWallet({ roi30d: 80, consistency: 80, copyability: 90, categoryEdge: 70, liquidityQuality: 70, entryTiming: 70, tradeFrequency: 70, resolvedPerformance: 70, oneHitProfitShare: 0.2 });
    expect(highCopyability).toBeGreaterThan(lowCopyability);
  });
});

describe("trade scoring and decisions", () => {
  const rules = { maxSpread: 0.05, minLiquidity: 3000, maxPriceMoveFromEntry: 0.12, minCopyScore: 72, watchScore: 55 };

  it("scores higher for cleaner trade setups", () => {
    const clean = scoreTrade({ walletGlobalScore: 80, walletCategoryScore: 75, walletEntryPrice: 0.45, currentMarketPrice: 0.47, spread: 0.01, liquidity: 9000, timeToResolutionHours: 60, thesisScore: 85 }, rules);
    const weak = scoreTrade({ walletGlobalScore: 60, walletCategoryScore: 50, walletEntryPrice: 0.30, currentMarketPrice: 0.48, spread: 0.09, liquidity: 1000, timeToResolutionHours: 220, thesisScore: 40 }, rules);
    expect(clean).toBeGreaterThan(weak);
  });

  it("creates paper_copy labels above threshold", () => {
    expect(decisionFromScore(80, rules)).toBe("paper_copy");
    expect(decisionFromScore(60, rules)).toBe("watchlist");
    expect(decisionFromScore(30, rules)).toBe("skip");
  });
});

describe("paper trading engine", () => {
  it("creates paper trade for paper_copy decisions", () => {
    const trade = createPaperTrade({ decision: "paper_copy", confidence: 0.8, entryPrice: 0.4, currentPrice: 0.45, side: "YES" });
    expect(trade).not.toBeNull();
    expect(simulatedPositionSize(0.8)).toBeGreaterThanOrEqual(5);
    expect(simulatedPositionSize(0.8)).toBeLessThanOrEqual(20);
  });

  it("updates hourly pnl snapshots", () => {
    const snapshots = updateHourlyPnl(0.4, [0.41, 0.39, 0.43], 10, "YES");
    expect(snapshots).toHaveLength(3);
    expect(snapshots[0].hour).toBe(1);
  });
});

describe("rules and benchmarks", () => {
  it("versions rules and applies automatic adjustments", () => {
    const next = nextRuleSet({ maxSpread: 0.05, minLiquidity: 3000, maxPriceMoveFromEntry: 0.12, minCopyScore: 72, watchScore: 55 }, { spreadHeavyLossRate: 0.6, lowLiquidityLossRate: 0.7, lateEntryLossRate: 0.6 });
    expect(next.maxSpread).toBeLessThan(0.05);
    expect(next.minLiquidity).toBeGreaterThan(3000);
    expect(bumpRuleVersion(3)).toBe(4);
  });

  it("compares bot benchmark against blind copy", () => {
    const output = compareBenchmarks({ botFiltered: [1, 2], blindCopy: [0, 1], watchlist: [0], skipped: [-1, 1] });
    expect(output.botBeatBlind).toBe(true);
  });
});

describe("safety", () => {
  it("enforces read-only paper mode", () => {
    process.env.ALLOW_LIVE_EXECUTION = "false";
    expect(() => assertPaperOnlySafety()).not.toThrow();
  });

  it("blocks real trade execution", () => {
    expect(() => executeRealTrade()).toThrow(/blocked/i);
  });
});
