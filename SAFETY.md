# SAFETY: Paper Trading Only (Version 1)

## Why version one is paper trading only
Copy trading systems can fail under fast-moving markets, stale inputs, and liquidity traps. Paper mode validates assumptions without risking capital.

## Why real execution is disabled
Version one does not request keys, does not sign transactions, and blocks real execution paths. This prevents accidental fund movement during research.

## How autonomy could be added later
Autonomy can be introduced only after sustained paper outperformance, reliability checks, kill-switches, audit logs, and strict risk limits are proven.

## Risks of stale data
If market or trade feeds lag, decisions become invalid. The app surfaces API errors directly and stops rather than inventing data.

## Risks of low liquidity
Low-liquidity markets increase slippage and make entries/exits hard to mirror.

## Risks of wide spreads
Wide spreads can erase signal edge and produce structurally poor fills.

## Risks of copy trading
Copying can be late, crowded, and disconnected from original trader context.

## Why leaderboard wallets can be misleading
Single outlier wins, survivor bias, and unresolved positions can inflate apparent edge.

## Why private keys should never be stored
Storing keys in app infrastructure raises theft and misuse risk; v1 intentionally avoids keys completely.
