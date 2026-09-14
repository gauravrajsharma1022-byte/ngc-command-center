// Northgate Consulting — Notion CMS integration
// Uses the Notion REST API directly (SDK v5 removed databases.query)

const NOTION_VERSION = "2022-06-28";

export const INSIGHTS_DB_ID = process.env.NOTION_INSIGHTS_DB_ID ?? "";
const NOTION_API_KEY        = process.env.NOTION_API_KEY ?? "";

export type InsightType = "Case Study" | "White Paper" | "Industry Insight";

export interface Insight {
  id:          string;
  title:       string;
  slug:        string;
  type:        InsightType;
  excerpt:     string;
  coverUrl?:   string;
  publishedAt: string;
  readTime?:   string;
  tags:        string[];
  notionUrl:   string;
}

// ── Property helpers ──────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function propText(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title")     return prop.title?.map((t: any) => t.plain_text).join("") ?? "";
  if (prop.type === "rich_text") return prop.rich_text?.map((t: any) => t.plain_text).join("") ?? "";
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function propSelect(prop: any): string {
  return prop?.select?.name ?? "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function propDate(prop: any): string {
  return prop?.date?.start ?? "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function propMultiSelect(prop: any): string[] {
  return prop?.multi_select?.map((s: any) => s.name) ?? [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function propFiles(prop: any): string | undefined {
  const files = prop?.files ?? [];
  if (!files.length) return undefined;
  const f = files[0];
  return f.type === "external" ? f.external?.url : f.type === "file" ? f.file?.url : undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pageToInsight(page: any): Insight {
  const props = page.properties ?? {};
  return {
    id:          page.id,
    title:       propText(props["Title"]),
    slug:        propText(props["Slug"]),
    type:        (propSelect(props["Type"]) || "Industry Insight") as InsightType,
    excerpt:     propText(props["Excerpt"]),
    coverUrl:    propFiles(props["Cover Image"]),
    publishedAt: propDate(props["Published Date"]),
    readTime:    propText(props["Read Time"]),
    tags:        propMultiSelect(props["Tags"]),
    notionUrl:   page.url,
  };
}

// ── API calls ─────────────────────────────────────────────────────────────────

async function notionFetch(path: string, body?: object): Promise<any> {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method:  body ? "POST" : "GET",
    headers: {
      "Authorization":  `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type":   "application/json",
    },
    body:    body ? JSON.stringify(body) : undefined,
    next:    { revalidate: 3600 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Notion API error ${res.status}: ${text}`);
  }

  return res.json();
}

export async function getInsights(): Promise<Insight[]> {
  if (!INSIGHTS_DB_ID || !NOTION_API_KEY) return [];

  try {
    const data = await notionFetch(`/databases/${INSIGHTS_DB_ID}/query`, {
      filter: { property: "Status", status: { equals: "Published" } },
      sorts:  [{ property: "Published Date", direction: "descending" }],
    });

    return (data.results ?? []).map(pageToInsight);
  } catch {
    return [];
  }
}

export async function getInsightBySlug(slug: string): Promise<Insight | null> {
  if (!INSIGHTS_DB_ID || !NOTION_API_KEY) return null;

  try {
    const data = await notionFetch(`/databases/${INSIGHTS_DB_ID}/query`, {
      filter: {
        and: [
          { property: "Slug",   rich_text: { equals: slug } },
          { property: "Status", status:    { equals: "Published" } },
        ],
      },
    });

    const page = data.results?.[0];
    return page ? pageToInsight(page) : null;
  } catch {
    return null;
  }
}
