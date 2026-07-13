# Hermes Polymarket Copy Trading Bot (Paper Trading Only)

## What this bot does
- Scans leaderboard and wallets for copy-trading research.
- Scores wallets by ROI, consistency, copyability, liquidity, timing, and one-hit-wonder risk.
- Scores new trades and labels them as `paper_copy`, `watchlist`, or `skip`.
- Simulates paper trades with $5-$20 position sizing.
- Tracks hourly PnL and compares bot-filtered strategy vs blind copy.
- Maintains rule changes and decision journal artifacts.
- Exposes a Vercel-ready Next.js dashboard with pages for Overview, Wallet Rankings, Wallet Profile, Trade Signals, Paper Trades, Decision Journal, Performance, Rules, and Reports.

## What this bot does not do
- Does **not** ask for private keys.
- Does **not** store private keys.
- Does **not** sign transactions.
- Does **not** execute real trades.
- Does **not** spend money.

## Safety
See `/SAFETY.md` for paper-only rationale and operational risks.

## Setup
1. Copy environment values:
   - `cp .env.example .env`
2. Install dependencies:
   - `npm install`
3. Initialize SQLite schema:
   - `npm run db:migrate`
4. Optional seed:
   - `npm run seed`

## Environment Variables
- `DATABASE_URL` SQLite connection string.
- `POLYMARKET_API_BASE` Polymarket market data endpoint.
- `LEADERBOARD_API_BASE` leaderboard source endpoint.
- `TELEGRAM_BOT_TOKEN` optional Telegram integration.
- `TELEGRAM_CHAT_ID` optional Telegram integration.
- `ALLOW_LIVE_EXECUTION` must remain `false` for v1.

## Run locally
- Dashboard: `npm run dev`
- Tests: `npm run test`
- Jobs:
  - `npm run scan:leaderboard`
  - `npm run scan:wallets`
  - `npm run monitor:trades`
  - `npm run score:trades`
  - `npm run paper:update-pnl`
  - `npm run review:outcomes`
  - `npm run update:rules`
  - `npm run report:daily`

## Deploy to Vercel
1. Import this repository into Vercel.
2. Add `.env.example` variables in Vercel Project Settings.
3. Set build command `npm run build` and output defaults for Next.js.
4. For persistent SQLite in production, switch to a hosted DB and update `DATABASE_URL`.

## Add to Max HQ
- Host dashboard in Vercel and iframe/embed the deployment URL in Max HQ.
- Keep dashboard in paper-only mode until edge is stable.

## How Hermes should operate it
- Use the job sequence in `docs/hermes-operator.md`.
- Run hourly PnL and end-of-day report jobs.
- Send minimal high-signal Telegram alerts only.

## Leaderboard scan flow
- Fetch top wallets from configured leaderboard adapter.
- Persist scan metadata and process top 500 wallet profiles.

## Wallet scoring flow
- Weighted score from ROI, consistency, copyability, category edge, liquidity quality, timing, and resolved outcomes.
- Penalizes one-hit-wonder concentration and poor copyability.

## Paper trading flow
- Only `paper_copy` signals create simulated positions.
- Position sizing is confidence-based in the $5-$20 range.
- Hourly snapshots update unrealized PnL.

## Self-improvement flow
- Rule updates apply automatically from performance signals.
- Every change stores before/after and evidence metadata.

## Interpreting dashboard
- Overview answers profitability, wallet quality, and daily learning state.
- Performance page shows bot-filtered vs blind copy and skip quality.
- Rules/Reports pages explain what changed and why.
