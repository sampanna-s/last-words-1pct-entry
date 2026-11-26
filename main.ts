import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const line = "I'm at 1%, and I'm taking the screenshots with me — you're welcome.";

// Mirror the gate: UTF-8 text, 1-199 characters, single line, not only white space.
function assertValidLine(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 199 || /[\r\n]/.test(text) || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

assertValidLine(line);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
const tmp = join(outputDir, ".entry.txt.tmp");
writeFileSync(tmp, line, "utf8");
renameSync(tmp, join(outputDir, "entry.txt"));
