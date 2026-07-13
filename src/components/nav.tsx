import Link from "next/link";

const links = [
  ["Overview", "/"],
  ["Wallet Rankings", "/wallet-rankings"],
  ["Wallet Profile", "/wallet-profile"],
  ["Trade Signals", "/trade-signals"],
  ["Paper Trades", "/paper-trades"],
  ["Decision Journal", "/decision-journal"],
  ["Performance", "/performance"],
  ["Rules", "/rules"],
  ["Reports", "/reports"],
] as const;

export function Nav() {
  return (
    <nav className="flex flex-wrap gap-2">
      {links.map(([label, href]) => (
        <Link key={href} href={href} className="rounded-md border border-zinc-300 px-3 py-1 text-sm hover:bg-zinc-100">
          {label}
        </Link>
      ))}
    </nav>
  );
}
