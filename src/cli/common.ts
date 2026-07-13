import { assertPaperOnlySafety } from "@/lib/safety";

export async function runJob(name: string, run: () => Promise<void>) {
  assertPaperOnlySafety();
  try {
    console.log(`[${name}] starting`);
    await run();
    console.log(`[${name}] completed`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error(`[${name}] failed:`, message);
    if (stack) console.error(stack);
    process.exitCode = 1;
  }
}
