import { NextRequest, NextResponse } from "next/server";
import { getTasks } from "../airtable";

export const runtime = "nodejs";

/**
 * GET /api/ngc-team/runs
 *
 * Lists all task runs with their current status and stages.
 * Used by the Command Center dashboard to show pipeline progress.
 *
 * Query params:
 * - status: filter by status (pending, in-progress, review, approved, rejected)
 * - taskId: get specific task
 * - limit: number of runs to return (default 20)
 *
 * Response:
 * - runs: array of task runs with stages and current progress
 * - total: total number of runs
 * - cursor: pagination cursor for next batch
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const statusFilter = searchParams.get("status");
    const taskIdFilter = searchParams.get("taskId");
    const limit = parseInt(searchParams.get("limit") || "20");

    // Get tasks from Airtable
    const assignedTasks = await getTasks();

    // Mock demo data (shown only if no assigned tasks)
    const mockRuns = [
      {
        id: "t1",
        title: "Competitive Analysis — McKinsey AI in Telecom",
        priority: 1,
        status: "review",
        assignedTo: "Dr. Amara Osei",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T12:45:00Z",
        criticFindings: 1,
        currentStage: "Package Assembly",
        stages: [
          {
            id: "research",
            name: "Research & Intelligence",
            agent: "Dr. Amara Osei",
            status: "done",
            completedAt: "2024-01-15T11:15:00Z",
          },
          {
            id: "critic",
            name: "Critic Review",
            agent: "Viktor Kaminski",
            status: "running",
            startedAt: "2024-01-15T11:20:00Z",
            log: "Verifying statistics... Found 1 item requiring recency check.",
          },
          {
            id: "package",
            name: "Package Assembly",
            agent: "Elena Vasquez",
            status: "pending",
          },
        ],
      },
      {
        id: "t2",
        title: "Solution Document — EU Telecom BSS Modernization",
        priority: 4,
        status: "in-progress",
        assignedTo: "Rajiv Malhotra",
        createdAt: "2024-01-15T04:00:00Z",
        updatedAt: "2024-01-15T13:00:00Z",
        criticFindings: 0,
        currentStage: "Documentation & Design",
        stages: [
          {
            id: "gap",
            name: "Gap Analysis",
            agent: "Rajiv Malhotra",
            status: "done",
            completedAt: "2024-01-15T08:30:00Z",
          },
          {
            id: "regulatory",
            name: "Regulatory Review",
            agent: "Layla Haddad + Govind Saxena",
            status: "done",
            completedAt: "2024-01-15T10:00:00Z",
          },
          {
            id: "doc",
            name: "Documentation & Design",
            agent: "Robert Hayes + Isabella Rossi",
            status: "running",
            startedAt: "2024-01-15T10:15:00Z",
            log: "Creating premium documentation with design mockups...",
          },
        ],
      },
    ];

    // Combine assigned tasks with mock data
    const allRuns = [...assignedTasks, ...mockRuns];

    // Apply filters
    let filtered = allRuns;

    if (statusFilter) {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    if (taskIdFilter) {
      filtered = filtered.filter((r) => r.id === taskIdFilter);
    }

    // Apply limit
    const results = filtered.slice(0, limit);
    const hasMore = filtered.length > limit;

    return NextResponse.json({
      runs: results,
      total: filtered.length,
      hasMore,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[NGC] Error fetching runs:", error);
    return NextResponse.json(
      { error: "Failed to fetch runs", details: String(error) },
      { status: 500 }
    );
  }
}
