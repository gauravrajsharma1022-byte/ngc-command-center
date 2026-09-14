"use client";

import { useEffect, useRef, useState } from "react";

type StageStatus = "pending" | "running" | "done" | "error";

type StageState = {
  id: string;
  label: string;
  status: StageStatus;
  log: string;
  error?: string;
};

const STAGE_DEFS = [
  { id: "scout", label: "Scout — Research" },
  { id: "strategist", label: "Strategist — Thesis Lock" },
  { id: "scribe", label: "Scribe — Draft" },
  { id: "sentinel", label: "Sentinel — Adversarial Review" },
  { id: "mason", label: "Mason — Visual" },
  { id: "warden", label: "Warden — Package" },
] as const;

const OUTPUT_FILES = [
  { file: "00-package.md", label: "Package (Warden)" },
  { file: "01-research.md", label: "Research (Scout)" },
  { file: "02-thesis.md", label: "Thesis (Strategist)" },
  { file: "03-draft.md", label: "Draft (Scribe)" },
  { file: "04-sentinel-review.md", label: "Review (Sentinel)" },
  { file: "05-mason-notes.md", label: "Visual Notes (Mason)" },
  { file: "06-visual.png", label: "Visual", isImage: true },
];

function initialStages(): StageState[] {
  return STAGE_DEFS.map((s) => ({ ...s, status: "pending" as StageStatus, log: "" }));
}

function statusDot(status: StageStatus) {
  const base = "inline-block w-2.5 h-2.5 rounded-full shrink-0";
  if (status === "done") return <span className={`${base} bg-brand-cyan`} />;
  if (status === "running")
    return <span className={`${base} bg-brand-blue animate-pulse`} />;
  if (status === "error") return <span className={`${base} bg-red-500`} />;
  return <span className={`${base} bg-slate-300`} />;
}

/** Minimal markdown-ish renderer — headers, bold, arrows, hr, paragraphs. No new dependency. */
function SimpleMarkdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let para: string[] = [];

  const flush = (key: string) => {
    if (para.length) {
      blocks.push(
        <p key={key} className="mb-3 leading-relaxed text-[#334155]/80 whitespace-pre-wrap">
          {renderInline(para.join("\n"))}
        </p>
      );
      para = [];
    }
  };

  function renderInline(s: string) {
    const parts = s.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) =>
      p.startsWith("**") && p.endsWith("**") ? (
        <strong key={i} className="text-[#0c1945] font-semibold">
          {p.slice(2, -2)}
        </strong>
      ) : (
        <span key={i}>{p}</span>
      )
    );
  }

  lines.forEach((line, idx) => {
    const key = `l${idx}`;
    if (line.startsWith("### ")) {
      flush(key);
      blocks.push(
        <h4 key={key} className="font-heading font-bold text-[#0c1945] text-sm mt-4 mb-1">
          {line.slice(4)}
        </h4>
      );
    } else if (line.startsWith("## ")) {
      flush(key);
      blocks.push(
        <h3 key={key} className="font-heading font-bold text-[#0c1945] text-base mt-5 mb-2">
          {line.slice(3)}
        </h3>
      );
    } else if (line.startsWith("# ")) {
      flush(key);
      blocks.push(
        <h2 key={key} className="font-heading font-bold text-[#0c1945] text-lg mt-5 mb-2">
          {line.slice(2)}
        </h2>
      );
    } else if (line.trim() === "---") {
      flush(key);
      blocks.push(<hr key={key} className="my-4 border-brand-border" />);
    } else if (line.trim() === "") {
      flush(key);
    } else {
      para.push(line);
    }
  });
  flush("last");

  return <div className="font-body text-sm">{blocks}</div>;
}

export default function WatchtowerPage() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [running, setRunning] = useState(false);
  const [stages, setStages] = useState<StageState[]>(initialStages());
  const [runId, setRunId] = useState<string | null>(null);
  const [runRelDir, setRunRelDir] = useState<string | null>(null);
  const [runError, setRunError] = useState<string | null>(null);

  const [pastRuns, setPastRuns] = useState<{ runId: string; mtime: number }[]>([]);
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [availableFiles, setAvailableFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [fileIsImage, setFileIsImage] = useState(false);

  const logEndRef = useRef<HTMLDivElement>(null);

  const refreshRuns = async () => {
    const res = await fetch("/api/watchtower/runs");
    const data = await res.json();
    setPastRuns(data.runs || []);
  };

  const openFile = async (rId: string, fname: string) => {
    setSelectedFile(fname);
    const isImage = fname.endsWith(".png");
    setFileIsImage(isImage);
    if (!isImage) {
      const res = await fetch(
        `/api/watchtower/file?path=${encodeURIComponent(`${rId}/${fname}`)}`
      );
      setFileContent(await res.text());
    }
  };

  // Fetch-on-mount is intentional here: this is a plain client-side internal
  // tool, not a Suspense/Server-Component data flow, so the usual "don't
  // setState from an effect" guidance doesn't have a better alternative to
  // offer for "load the run list when the page opens."
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refreshRuns();
  }, []);

  useEffect(() => {
    if (!activeRunId) return;
    void (async () => {
      const res = await fetch(`/api/watchtower/runs?runId=${encodeURIComponent(activeRunId)}`);
      const data = await res.json();
      setAvailableFiles(data.files || []);
      if (data.files?.includes("00-package.md")) {
        await openFile(activeRunId, "00-package.md");
      } else if (data.files?.length) {
        await openFile(activeRunId, data.files[0]);
      }
    })();
  }, [activeRunId]);

  const runAgents = async () => {
    if (!topic.trim() || running) return;
    setRunning(true);
    setRunError(null);
    setStages(initialStages());
    setRunId(null);
    setRunRelDir(null);

    const fd = new FormData();
    fd.append("topic", topic);
    fd.append("notes", notes);
    if (file) fd.append("document", file);

    try {
      const res = await fetch("/api/watchtower/run", { method: "POST", body: fd });
      if (!res.body) throw new Error("No response stream from server.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          const evt = JSON.parse(line);
          handleEvent(evt);
        }
      }
    } catch (err) {
      setRunError(err instanceof Error ? err.message : String(err));
    } finally {
      setRunning(false);
      refreshRuns();
    }
  };

  const handleEvent = (evt: {
    type: string;
    stage?: string;
    label?: string;
    chunk?: string;
    ok?: boolean;
    error?: string;
    runId?: string;
    runRelDir?: string;
  }) => {
    if (evt.type === "run-start") {
      setRunId(evt.runId || null);
      setRunRelDir(evt.runRelDir || null);
      setActiveRunId(evt.runId || null);
    } else if (evt.type === "stage-start") {
      setStages((prev) =>
        prev.map((s) => (s.id === evt.stage ? { ...s, status: "running" } : s))
      );
    } else if (evt.type === "stage-log") {
      setStages((prev) =>
        prev.map((s) =>
          s.id === evt.stage ? { ...s, log: s.log + (evt.chunk || "") } : s
        )
      );
      logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (evt.type === "stage-end") {
      setStages((prev) =>
        prev.map((s) =>
          s.id === evt.stage
            ? { ...s, status: evt.ok ? "done" : "error", error: evt.error }
            : s
        )
      );
    } else if (evt.type === "run-error") {
      setRunError(evt.error || "Pipeline failed.");
    } else if (evt.type === "run-complete") {
      if (evt.runId) setActiveRunId(evt.runId);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fc] font-body">
      {/* Header */}
      <div className="bg-[#0c1945] px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-brand-cyan" />
              <span className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-brand-cyan">
                Local Internal Tool
              </span>
            </div>
            <h1 className="font-heading font-bold text-white text-2xl">Northgate Watchtower</h1>
          </div>
          <p className="text-white/40 text-sm font-body max-w-xs text-right hidden sm:block">
            Scout → Strategist → Scribe → Sentinel → Mason → Warden
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* Left column — form + progress */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-brand-border shadow-card p-5">
            <h2 className="font-heading font-bold text-[#0c1945] text-base mb-4">New Run</h2>

            <label className="block text-xs font-semibold uppercase tracking-wide text-[#6b7494] mb-1.5">
              Topic
            </label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={running}
              placeholder="e.g. Catalog-Driven Orchestration vs. Intent-Based Agentic Commerce"
              className="w-full rounded-lg border border-brand-border px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 disabled:bg-slate-50"
            />

            <label className="block text-xs font-semibold uppercase tracking-wide text-[#6b7494] mb-1.5">
              Source document (optional)
            </label>
            <input
              type="file"
              accept=".pdf,.txt,.md,.doc,.docx"
              disabled={running}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm mb-4 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-navy file:text-white file:px-3 file:py-1.5 file:text-xs file:font-semibold"
            />

            <label className="block text-xs font-semibold uppercase tracking-wide text-[#6b7494] mb-1.5">
              Notes for the agents
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={running}
              rows={4}
              placeholder="Angle to emphasize, sector to ground it in, anything Scout/Strategist should know..."
              className="w-full rounded-lg border border-brand-border px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 disabled:bg-slate-50 resize-none"
            />

            <button
              onClick={runAgents}
              disabled={running || !topic.trim()}
              className="w-full rounded-xl bg-brand-blue text-white font-heading font-semibold text-sm py-3 hover:bg-[#2f4bbf] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {running ? "Running…" : "Run Agents"}
            </button>

            {runError && (
              <p className="mt-3 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{runError}</p>
            )}
            {runId && (
              <p className="mt-3 text-[11px] text-[#6b7494] font-mono">{runRelDir}</p>
            )}
          </div>

          {/* Stage progress */}
          <div className="bg-white rounded-2xl border border-brand-border shadow-card p-5">
            <h2 className="font-heading font-bold text-[#0c1945] text-base mb-4">Pipeline Progress</h2>
            <div className="space-y-1">
              {stages.map((s) => (
                <details key={s.id} className="group" open={s.status === "running" || s.status === "error"}>
                  <summary className="flex items-center gap-2.5 py-2 cursor-pointer list-none">
                    {statusDot(s.status)}
                    <span className="text-sm font-medium text-[#0c1945] flex-1">{s.label}</span>
                    <span className="text-[10px] uppercase tracking-wide text-[#6b7494]">
                      {s.status}
                    </span>
                  </summary>
                  {s.log && (
                    <pre className="ml-5 mb-2 text-[11px] leading-relaxed text-[#45507a] bg-[#f5f7fc] rounded-lg p-3 max-h-40 overflow-y-auto whitespace-pre-wrap">
                      {s.log}
                    </pre>
                  )}
                  {s.error && (
                    <p className="ml-5 mb-2 text-[11px] text-red-600">{s.error}</p>
                  )}
                </details>
              ))}
            </div>
            <div ref={logEndRef} />
          </div>

          {/* Past runs */}
          <div className="bg-white rounded-2xl border border-brand-border shadow-card p-5">
            <h2 className="font-heading font-bold text-[#0c1945] text-base mb-3">Past Runs</h2>
            {pastRuns.length === 0 && (
              <p className="text-xs text-[#6b7494]">No runs yet.</p>
            )}
            <div className="space-y-1 max-h-56 overflow-y-auto">
              {pastRuns.map((r) => (
                <button
                  key={r.runId}
                  onClick={() => setActiveRunId(r.runId)}
                  className={`w-full text-left text-xs px-3 py-2 rounded-lg font-mono truncate transition-colors ${
                    activeRunId === r.runId
                      ? "bg-brand-navy text-white"
                      : "text-[#45507a] hover:bg-[#f5f7fc]"
                  }`}
                >
                  {r.runId}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column — review pane */}
        <div className="bg-white rounded-2xl border border-brand-border shadow-card overflow-hidden flex flex-col min-h-[600px]">
          {activeRunId ? (
            <>
              <div className="flex items-center gap-1 border-b border-brand-border px-4 pt-3 overflow-x-auto">
                {OUTPUT_FILES.filter((f) => availableFiles.includes(f.file)).map((f) => (
                  <button
                    key={f.file}
                    onClick={() => activeRunId && openFile(activeRunId, f.file)}
                    className={`shrink-0 px-3 py-2 text-xs font-semibold rounded-t-lg transition-colors ${
                      selectedFile === f.file
                        ? "bg-[#eef2fb] text-[#0c1945]"
                        : "text-[#6b7494] hover:text-[#0c1945]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                {fileIsImage && activeRunId && selectedFile ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/api/watchtower/file?path=${encodeURIComponent(`${activeRunId}/${selectedFile}`)}`}
                    alt={selectedFile}
                    className="max-w-full rounded-xl border border-brand-border shadow-card mx-auto"
                  />
                ) : (
                  <SimpleMarkdown text={fileContent} />
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center px-8">
              <div>
                <p className="font-heading font-bold text-[#0c1945] mb-2">Nothing to review yet</p>
                <p className="text-sm text-[#6b7494] max-w-sm">
                  Start a run on the left, or pick a past run to review its outputs here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
