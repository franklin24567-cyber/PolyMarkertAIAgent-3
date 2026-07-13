export function assertPaperOnlySafety(): void {
  if (process.env.ALLOW_LIVE_EXECUTION === "true") {
    throw new Error("Live execution is disabled in version one. Set ALLOW_LIVE_EXECUTION=false.");
  }
}

export function executeRealTrade(): never {
  throw new Error("Real trade execution is blocked. Paper trading only.");
}
