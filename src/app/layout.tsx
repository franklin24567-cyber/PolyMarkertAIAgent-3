import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Nav } from "@/components/nav";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hermes Polymarket Paper Trading",
  description: "Paper-only Polymarket copy-trading research dashboard.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <header className="mb-6 space-y-3">
            <h1 className="text-2xl font-bold">Hermes Polymarket (Paper Trading Only)</h1>
            <p className="text-sm text-zinc-600">Safety mode: no private keys, no real trades, no transaction signing.</p>
            <Nav />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
