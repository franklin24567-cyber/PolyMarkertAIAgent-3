import { assertPaperOnlySafety } from "@/lib/safety";

export async function runJob(name: string, run: () => Promise<void>) {
  assertPaperOnlySafety();
  try {
    console.log(`[${name}] starting`);
    await run();
    console.log(`[${name}] completed`);
  } catch (error) {
    console.error(`[${name}] failed`, error);
    process.exitCode = 1;
  }
}
