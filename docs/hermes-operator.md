# Hermes Operator Prompt and Cron Examples

Hermes runs these jobs in sequence with strict paper-only safety checks:
- `npm run scan:leaderboard`
- `npm run scan:wallets`
- `npm run monitor:trades`
- `npm run score:trades`
- `npm run paper:update-pnl`
- `npm run review:outcomes`
- `npm run update:rules`
- `npm run report:daily`

Cron examples:
- `0 * * * * npm run paper:update-pnl`
- `0 23 * * * npm run report:daily`
- `*/30 * * * * npm run monitor:trades`

Telemetry rule:
- Show real errors and stop execution when external APIs fail.
