import type { PaperTradeInput } from "@/lib/types";

export function simulatedPositionSize(confidence: number): number {
  const normalized = Math.max(0, Math.min(1, confidence));
  return Math.round((5 + normalized * 15) * 100) / 100;
}

export function createPaperTrade(input: PaperTradeInput) {
  if (input.decision !== "paper_copy") return null;
  const size = simulatedPositionSize(input.confidence);
  return {
    entryPrice: input.entryPrice,
    currentPrice: input.currentPrice,
    side: input.side,
    simulatedPositionSize: size,
    unrealizedPnl: pnlValue(input.entryPrice, input.currentPrice, size, input.side),
  };
}

export function pnlValue(entryPrice: number, currentPrice: number, size: number, side: "YES" | "NO") {
  const direction = side === "YES" ? 1 : -1;
  return Math.round(((currentPrice - entryPrice) * direction * size * 100) / entryPrice) / 100;
}

export function updateHourlyPnl(entryPrice: number, prices: number[], size: number, side: "YES" | "NO") {
  return prices.map((price, hour) => ({ hour: hour + 1, price, pnl: pnlValue(entryPrice, price, size, side) }));
}
