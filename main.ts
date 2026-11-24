// One-Line Office Joke: 24-Hour Sprint
// Writes the entry (one line, <=200 chars) to /output/entry.txt.
// Deterministic, no network, no dependencies. Run from any cwd.
// The entry is assembled from parts so the joke's beats stay readable;
// the gate (1-200 Unicode code points, non-blank, single line) is
// validated here before anything is written.
//
// The joke: the office printer as spirit animal. The setup borrows HR's
// own language ("spirit animal"), the middle beat is a worker's confession,
// and the punchline flips it — printers jam exactly when the document
// matters, which is the most relatable office truth there is.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PARTS = [
  "I told HR my spirit animal is the office printer:",
  "I only work when nobody is watching,",
  "and I jam the moment anything is urgent.",
];

const ENTRY = PARTS.join(" ");

const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} chars, gate is 1-200`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be one non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`ok: entry.txt ${chars.length} chars`);
