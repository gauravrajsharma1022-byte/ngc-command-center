import { readdir, stat } from "fs/promises";
import path from "path";

const PROJECT_ROOT = process.cwd();
const OUTPUTS_DIR = path.join(PROJECT_ROOT, "Northgate Linkedin Post", "outputs");

const STAGE_FILES = [
  "01-research.md",
  "02-thesis.md",
  "03-draft.md",
  "04-sentinel-review.md",
  "05-mason-notes.md",
  "06-visual.png",
  "00-package.md",
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const runId = searchParams.get("runId");

  try {
    if (runId) {
      // Return which stage files exist for a specific run.
      const runDir = path.join(OUTPUTS_DIR, runId);
      const resolved = path.resolve(runDir);
      if (!resolved.startsWith(path.resolve(OUTPUTS_DIR) + path.sep)) {
        return Response.json({ error: "Forbidden" }, { status: 403 });
      }
      const entries: string[] = await readdir(resolved).catch(() => []);
      const files = STAGE_FILES.filter((f) => entries.includes(f));
      return Response.json({ runId, files });
    }

    const entries = await readdir(OUTPUTS_DIR, { withFileTypes: true });
    const runs = await Promise.all(
      entries
        .filter((e) => e.isDirectory())
        .map(async (e) => {
          const s = await stat(path.join(OUTPUTS_DIR, e.name));
          return { runId: e.name, mtime: s.mtimeMs };
        })
    );
    runs.sort((a, b) => b.mtime - a.mtime);
    return Response.json({ runs });
  } catch {
    return Response.json({ runs: [] });
  }
}
