import { readFile, stat } from "fs/promises";
import path from "path";

// Serves files from Northgate Linkedin Post/outputs/** only. Rejects anything
// that resolves outside that directory (path traversal guard) before touching disk.

const PROJECT_ROOT = process.cwd();
const OUTPUTS_DIR = path.join(PROJECT_ROOT, "Northgate Linkedin Post", "outputs");

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".pdf": "application/pdf",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rel = searchParams.get("path");

  if (!rel) {
    return new Response("Missing path", { status: 400 });
  }

  const resolved = path.resolve(OUTPUTS_DIR, rel);
  const normalizedRoot = path.resolve(OUTPUTS_DIR) + path.sep;

  if (!resolved.startsWith(normalizedRoot)) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const fileStat = await stat(resolved);
    if (!fileStat.isFile()) {
      return new Response("Not found", { status: 404 });
    }
    const data = await readFile(resolved);
    const ext = path.extname(resolved).toLowerCase();
    const contentType = CONTENT_TYPES[ext] || "application/octet-stream";

    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
