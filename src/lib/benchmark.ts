export interface BenchmarkSeries {
  botFiltered: number[];
  blindCopy: number[];
  watchlist: number[];
  skipped: number[];
}

const sum = (values: number[]) => values.reduce((acc, value) => acc + value, 0);

export function compareBenchmarks(series: BenchmarkSeries) {
  const bot = sum(series.botFiltered);
  const blind = sum(series.blindCopy);
  const watch = sum(series.watchlist);
  const skipped = sum(series.skipped);

  return {
    bot,
    blind,
    watch,
    skipped,
    missedWinners: series.skipped.filter((x) => x > 0).length,
    avoidedLosers: series.skipped.filter((x) => x < 0).length,
    botBeatBlind: bot > blind,
  };
}
