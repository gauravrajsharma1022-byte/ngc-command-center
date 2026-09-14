import { spawn } from "child_process";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

// Local-only internal tool: orchestrates the Northgate Watchtower pipeline
// (Scout -> Strategist -> Scribe -> Sentinel -> Mason -> Warden) by shelling
// out to the `claude` CLI in headless (-p) mode, once per stage, reusing the
// exact agent definitions in .claude/agents/. Never deploy this route publicly.

export const dynamic = "force-dynamic";

const PROJECT_ROOT = process.cwd();
const WATCHTOWER_DIR = path.join(PROJECT_ROOT, "Northgate Linkedin Post");
const OUTPUTS_DIR = path.join(WATCHTOWER_DIR, "outputs");

const MAX_BUDGET_USD = "1.00"; // safety cap per stage

// Scout does real web research (searches + fetches, with retries when a site
// blocks automated fetches) and genuinely needs more headroom than the other
// stages. The default used to be 4 minutes, based on small test topics —
// a real content-heavy topic (e.g. a research brief folding 7 signals into
// 3 beats) gave Scribe genuinely more to synthesize and blew past that on
// a real run. 6 minutes is the new floor for every stage that reads/reasons
// over files already on disk; Scout and Mason still get more on top of that.
const DEFAULT_TIMEOUT_MS = 6 * 60 * 1000;
const STAGE_TIMEOUTS_MS: Record<string, number> = {
  scout: 10 * 60 * 1000,
  mason: 6 * 60 * 1000, // includes a Bash/python image-generation step
};

type Stage = {
  id: string;
  label: string;
  agent: string;
  tools: string[];
  prompt: (ctx: RunContext) => string;
};

type RunContext = {
  topic: string;
  notes: string;
  runRelDir: string; // e.g. "Northgate Linkedin Post/outputs/2026-08-20-slug"
  hasDocument: boolean;
  docRelPath: string | null;
};

function slugify(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "untitled";
}

function docLine(ctx: RunContext): string {
  return ctx.hasDocument
    ? `A source document has been provided at "${ctx.docRelPath}" — read it first; it contains the primary content/claims for this topic. Verify any external facts it asserts, and flag anything unverifiable rather than repeating it as fact.`
    : "No source document was provided for this run — research the topic from scratch.";
}

const STAGES: Stage[] = [
  {
    id: "scout",
    label: "Scout — Research",
    agent: "northgate-scout",
    tools: ["WebSearch", "WebFetch", "Read", "Write"],
    prompt: (ctx) =>
      `Topic: ${ctx.topic}\n\nUser notes for you to consider: ${ctx.notes || "(none given)"}\n\n${docLine(
        ctx
      )}\n\nRun folder: "${ctx.runRelDir}"\n\nProduce your research brief as instructed in your role definition, writing it to "${ctx.runRelDir}/01-research.md".`,
  },
  {
    id: "strategist",
    label: "Strategist — Thesis Lock",
    agent: "northgate-strategist",
    tools: ["Read", "Write"],
    prompt: (ctx) =>
      `Topic: ${ctx.topic}\n\nUser notes: ${ctx.notes || "(none given)"}\n\nRun folder: "${ctx.runRelDir}"\n\nRead "${ctx.runRelDir}/01-research.md"${
        ctx.hasDocument ? ` and the source document at "${ctx.docRelPath}"` : ""
      }, then produce your thesis lock as instructed, writing to "${ctx.runRelDir}/02-thesis.md".`,
  },
  {
    id: "scribe",
    label: "Scribe — Draft",
    agent: "northgate-scribe",
    tools: ["Read", "Write"],
    prompt: (ctx) =>
      `Run folder: "${ctx.runRelDir}"\n\nRead "02-thesis.md" and "01-research.md" in that folder, and write the draft short post plus a short description as instructed to "${ctx.runRelDir}/03-draft.md".`,
  },
  {
    id: "sentinel",
    label: "Sentinel — Adversarial Review",
    agent: "northgate-sentinel",
    tools: ["Read", "Write"],
    prompt: (ctx) =>
      `Run folder: "${ctx.runRelDir}"\n\nRead "03-draft.md" (and the other stage files if useful) and write your adversarial review to "${ctx.runRelDir}/04-sentinel-review.md".`,
  },
  {
    id: "mason",
    label: "Mason — Visual",
    agent: "northgate-mason",
    tools: ["Read", "Write", "Bash"],
    prompt: (ctx) =>
      `Run folder: "${ctx.runRelDir}"\n\nRead "04-sentinel-review.md" to confirm the caption is ready to proceed, then read the final caption in "03-draft.md". Build one premium on-brand post visual covering the post's structure, reusing "Northgate Linkedin Post/pipeline/watchtower_visuals.py" via python3/Bash. Save the image as "${ctx.runRelDir}/06-visual.png" and write your notes to "${ctx.runRelDir}/05-mason-notes.md".`,
  },
  {
    id: "warden",
    label: "Warden — Package",
    agent: "northgate-warden",
    tools: ["Read", "Write"],
    prompt: (ctx) =>
      `Run folder: "${ctx.runRelDir}"\n\nAssemble everything in that folder into "${ctx.runRelDir}/00-package.md" as instructed by your role definition.`,
  },
];

// Translates a tool_use block into a short, human-readable progress line —
// this is what makes "what is Scout actually doing right now" visible instead
// of a silent multi-second gap while WebSearch/WebFetch/etc. run.
function summarizeToolInput(name: string, input: Record<string, unknown>): string {
  switch (name) {
    case "WebSearch":
      return `Searching: "${input.query}"`;
    case "WebFetch":
      return `Fetching: ${input.url}`;
    case "Write":
      return `Writing: ${input.file_path}`;
    case "Read":
      return `Reading: ${input.file_path}`;
    case "Bash":
      return `Running: ${String(input.command || "").slice(0, 90)}`;
    default:
      return `Using ${name}`;
  }
}

type ContentBlock = {
  type: string;
  name?: string;
  input?: Record<string, unknown>;
  text?: string;
};
type StreamEvent = {
  type: string;
  message?: { content?: ContentBlock[] };
  total_cost_usd?: number;
  duration_ms?: number;
  is_error?: boolean;
};

function describeStreamEvent(evt: StreamEvent): string | null {
  if (evt.type === "assistant" && evt.message?.content) {
    for (const block of evt.message.content) {
      if (block.type === "tool_use" && block.name) {
        return `→ ${summarizeToolInput(block.name, block.input || {})}`;
      }
      if (block.type === "text" && block.text) {
        const t = block.text.trim();
        return t.length > 280 ? `${t.slice(0, 280)}…` : t;
      }
    }
  }
  if (evt.type === "user" && evt.message?.content) {
    for (const block of evt.message.content) {
      if (block.type === "tool_result") return "  ✓ done";
    }
  }
  if (evt.type === "result") {
    const cost = evt.total_cost_usd != null ? `$${Number(evt.total_cost_usd).toFixed(3)}` : "";
    const secs = evt.duration_ms ? `${(evt.duration_ms / 1000).toFixed(1)}s` : "";
    return `✓ Stage complete${cost ? ` — ${cost}` : ""}${secs ? `, ${secs}` : ""}`;
  }
  return null;
}

function runStage(
  stage: Stage,
  ctx: RunContext,
  onChunk: (text: string) => void
): Promise<{ ok: boolean; exitCode: number | null; error?: string }> {
  return new Promise((resolve) => {
    const args = [
      "-p",
      "--output-format",
      "stream-json",
      "--verbose",
      "--agent",
      stage.agent,
      "--max-budget-usd",
      MAX_BUDGET_USD,
      "--allowedTools",
      ...stage.tools,
      "--",
      stage.prompt(ctx),
    ];

    // stdin explicitly closed ("ignore"): without this, spawn() leaves an open
    // but unwritten stdin pipe, and the CLI spends ~3s per stage deciding
    // whether piped input is coming before proceeding without it.
    const child = spawn("claude", args, { cwd: PROJECT_ROOT, stdio: ["ignore", "pipe", "pipe"] });

    const timeoutMs = STAGE_TIMEOUTS_MS[stage.id] ?? DEFAULT_TIMEOUT_MS;
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        child.kill("SIGKILL");
        resolve({ ok: false, exitCode: null, error: `Stage timed out after ${timeoutMs / 1000}s` });
      }
    }, timeoutMs);

    let buffer = "";
    child.stdout.on("data", (d) => {
      buffer += d.toString();
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const evt = JSON.parse(line) as StreamEvent;
          const friendly = describeStreamEvent(evt);
          if (friendly) onChunk(friendly + "\n");
        } catch {
          // Not a JSON line (shouldn't normally happen with stream-json) — pass through raw.
          onChunk(line + "\n");
        }
      }
    });
    child.stderr.on("data", (d) => onChunk(d.toString()));

    child.on("error", (err) => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        resolve({ ok: false, exitCode: null, error: err.message });
      }
    });

    child.on("close", (code) => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        resolve({ ok: code === 0, exitCode: code });
      }
    });
  });
}

export async function POST(request: Request) {
  const encoder = new TextEncoder();

  const formData = await request.formData();
  const topic = String(formData.get("topic") || "").trim();
  const notes = String(formData.get("notes") || "").trim();
  const file = formData.get("document") as File | null;

  if (!topic) {
    return new Response(JSON.stringify({ error: "Topic is required." }), { status: 400 });
  }

  const dateStr = new Date().toISOString().slice(0, 10);
  const runId = `${dateStr}-${slugify(topic)}`;
  const runDir = path.join(OUTPUTS_DIR, runId);
  const runRelDir = path
    .relative(PROJECT_ROOT, runDir)
    .split(path.sep)
    .join("/");

  await mkdir(runDir, { recursive: true });

  let docRelPath: string | null = null;
  if (file && file.size > 0) {
    const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
    const destName = `00-source-document.${ext || "bin"}`;
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(runDir, destName), buf);
    docRelPath = `${runRelDir}/${destName}`;
  }

  const ctx: RunContext = {
    topic,
    notes,
    runRelDir,
    hasDocument: !!docRelPath,
    docRelPath,
  };

  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: unknown) => {
        controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));
      };

      send({ type: "run-start", runId, runRelDir });

      for (const stage of STAGES) {
        send({ type: "stage-start", stage: stage.id, label: stage.label });

        const result = await runStage(stage, ctx, (chunk) => {
          send({ type: "stage-log", stage: stage.id, chunk });
        });

        send({
          type: "stage-end",
          stage: stage.id,
          ok: result.ok,
          exitCode: result.exitCode,
          error: result.error,
        });

        if (!result.ok) {
          send({ type: "run-error", stage: stage.id, error: result.error || `Exited with code ${result.exitCode}` });
          controller.close();
          return;
        }
      }

      send({ type: "run-complete", runId, runRelDir });
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}
