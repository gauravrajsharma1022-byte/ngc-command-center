/**
 * Airtable Integration
 * Replaces in-memory storage with live Airtable connection
 * Zero cost - uses free Airtable tier (1200 records)
 */

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN || "";
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || "";
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID || "";

const AIRTABLE_API = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;

export async function getTasks() {
  if (!AIRTABLE_TOKEN) {
    console.warn("[NGC] Airtable token not configured. Using demo mode.");
    return getDemoTasks();
  }

  try {
    const response = await fetch(AIRTABLE_API, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      },
    });

    if (!response.ok) {
      console.error("[NGC] Airtable API error:", response.status);
      return getDemoTasks();
    }

    const data = await response.json();
    return (data.records || []).map((record: any) => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error("[NGC] Airtable fetch error:", error);
    return getDemoTasks();
  }
}

export async function createTask(fields: any) {
  if (!AIRTABLE_TOKEN) {
    return { error: "Airtable not configured" };
  }

  try {
    const response = await fetch(AIRTABLE_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields }],
      }),
    });

    const data = await response.json();
    return data.records?.[0] || { error: "Failed to create task" };
  } catch (error) {
    console.error("[NGC] Airtable create error:", error);
    return { error: String(error) };
  }
}

export async function updateTask(recordId: string, fields: any) {
  if (!AIRTABLE_TOKEN) {
    return { error: "Airtable not configured" };
  }

  try {
    const response = await fetch(`${AIRTABLE_API}/${recordId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });

    return await response.json();
  } catch (error) {
    console.error("[NGC] Airtable update error:", error);
    return { error: String(error) };
  }
}

// Demo tasks for development
function getDemoTasks() {
  return [
    {
      id: "rec1",
      title: "Competitive Analysis — McKinsey AI in Telecom",
      priority: 1,
      status: "in-progress",
      assignedTeam: "Research & Intelligence",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      daysOpen: 3,
      criticFindings: 0,
      quality: "medium",
      details: "Analyze McKinsey and Deloitte positioning on AI in telecom BSS/OSS",
      currentStage: "Research Phase",
      agentOutput: "",
      lastUpdated: new Date().toISOString(),
    },
    {
      id: "rec2",
      title: "Market Research — APAC A2P Trends",
      priority: 5,
      status: "review",
      assignedTeam: "Research & Intelligence",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      daysOpen: 1,
      criticFindings: 1,
      quality: "high",
      details: "Research A2P messaging market across APAC region",
      currentStage: "Ready for Approval",
      agentOutput: "Detailed market analysis of A2P trends in APAC...",
      lastUpdated: new Date().toISOString(),
    },
  ];
}
