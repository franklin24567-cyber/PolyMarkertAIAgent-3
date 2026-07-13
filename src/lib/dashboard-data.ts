import { compareBenchmarks } from "@/lib/benchmark";
import { DEFAULT_RULES } from "@/lib/defaults";
import { createPaperTrade } from "@/lib/paper-trading";
import { decisionFromScore, scoreTrade, scoreWallet } from "@/lib/scoring";

const wallets = [
  {
    address: "0xA13...9f1",
    label: "MacroAlpha",
    category: "Politics",
    roi30d: 82,
    consistency: 78,
    copyability: 76,
    categoryEdge: 80,
    liquidityQuality: 74,
    entryTiming: 72,
    tradeFrequency: 70,
    resolvedPerformance: 79,
    oneHitProfitShare: 0.31,
    status: "track",
  },
  {
    address: "0xB27...f02",
    label: "FastTape",
    category: "Sports",
    roi30d: 88,
    consistency: 40,
    copyability: 35,
    categoryEdge: 42,
    liquidityQuality: 38,
    entryTiming: 33,
    tradeFrequency: 65,
    resolvedPerformance: 44,
    oneHitProfitShare: 0.76,
    status: "watch",
  },
];

const scoredWallets = wallets.map((wallet, index) => ({
  ...wallet,
  globalScore: scoreWallet(wallet),
  sourceRank: index + 1,
}));

const signals = [
  {
    id: "sig-1",
    marketQuestion: "Will candidate X win?",
    walletEntryPrice: 0.44,
    currentPrice: 0.48,
    spread: 0.02,
    liquidity: 9800,
    timeToResolutionHours: 48,
    thesisScore: 84,
    marketCategory: "Politics",
    side: "YES" as const,
    wallet: scoredWallets[0],
  },
  {
    id: "sig-2",
    marketQuestion: "Will team Y make playoffs?",
    walletEntryPrice: 0.29,
    currentPrice: 0.41,
    spread: 0.08,
    liquidity: 1200,
    timeToResolutionHours: 180,
    thesisScore: 44,
    marketCategory: "Sports",
    side: "NO" as const,
    wallet: scoredWallets[1],
  },
];

const decisions = signals.map((signal) => {
  const score = scoreTrade(
    {
      walletGlobalScore: signal.wallet.globalScore,
      walletCategoryScore: signal.wallet.category === signal.marketCategory ? 80 : 45,
      walletEntryPrice: signal.walletEntryPrice,
      currentMarketPrice: signal.currentPrice,
      spread: signal.spread,
      liquidity: signal.liquidity,
      timeToResolutionHours: signal.timeToResolutionHours,
      thesisScore: signal.thesisScore,
    },
    DEFAULT_RULES,
  );

  return {
    ...signal,
    score,
    decision: decisionFromScore(score, DEFAULT_RULES),
    reason:
      score >= DEFAULT_RULES.minCopyScore
        ? "High quality wallet and copyable entry"
        : score >= DEFAULT_RULES.watchScore
          ? "Interesting setup but not clean enough"
          : "Too late or too illiquid",
  };
});

const benchmark = compareBenchmarks({
  botFiltered: [2.4, 1.2, -0.4, 3.1],
  blindCopy: [1.1, -0.2, -1.7, 0.8],
  watchlist: [0.2, 0.5, -0.1],
  skipped: [-0.8, 1.4, -1.2],
});

const paperTrades = decisions
  .map((decision) => {
    const trade = createPaperTrade({
      decision: decision.decision,
      confidence: decision.score / 100,
      entryPrice: decision.walletEntryPrice,
      currentPrice: decision.currentPrice,
      side: decision.side,
    });

    if (!trade) {
      return null;
    }

    return {
      marketQuestion: decision.marketQuestion,
      status: "open",
      simulatedPositionSize: trade.simulatedPositionSize,
      pnl: trade.unrealizedPnl,
      side: trade.side,
    };
  })
  .filter((trade): trade is NonNullable<typeof trade> => trade !== null);

export const dashboardData = {
  demoMode: true,
  totalPaperPnl: 6.3,
  winRate: 0.62,
  openPositions: 3,
  activeTrackedWallets: scoredWallets.filter((wallet) => wallet.status === "track").length,
  copyCandidatesToday: decisions.filter((decision) => decision.decision === "paper_copy").length,
  reportStatus: "ready",
  latestRuleChanges: ["Lowered max spread from 0.06 to 0.05 based on spread-heavy losses"],
  wallets: scoredWallets,
  decisions,
  benchmark,
  rules: DEFAULT_RULES,
  paperTrades,
};
