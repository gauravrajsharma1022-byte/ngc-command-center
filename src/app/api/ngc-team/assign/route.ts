import { NextRequest, NextResponse } from "next/server";
import { addTask, updateTaskStatus } from "../store";

export const runtime = "nodejs";

interface AssignTaskRequest {
  priority: number;
  details: string;
  context?: string;
}

/**
 * POST /api/ngc-team/assign
 *
 * Assigns a task to Elena (Chief of Staff) for routing.
 * Elena determines which principal(s) own the task and sequences multi-team work.
 *
 * Request body:
 * - priority: 1-12 (task number)
 * - details: task description and guidance
 * - context: optional context/reference
 *
 * Response:
 * - taskId: unique identifier for tracking
 * - status: "queued" or "error"
 * - message: status description
 */
export async function POST(req: NextRequest) {
  try {
    const body: AssignTaskRequest = await req.json();
    const { priority, details, context } = body;

    if (!priority || !details) {
      return NextResponse.json(
        { error: "priority and details are required" },
        { status: 400 }
      );
    }

    // Generate unique task ID
    const taskId = `task-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    // Route to Elena for assignment
    const taskMapping = {
      1: { lead: "research", support: ["marketing"] },
      2: { lead: "research", support: ["legal"] },
      3: { lead: "architecture", support: ["research"] },
      4: { lead: "architecture", support: ["writing", "design"] },
      5: { lead: "research", support: ["domains"] },
      6: { lead: "marketing", support: ["writing", "design", "architecture"] },
      7: { lead: "marketing", support: [] },
      8: { lead: "marketing", support: ["design", "legal"] },
      9: { lead: "legal", support: [] },
      10: { lead: "business", support: ["research", "architecture", "legal"] },
      11: { lead: "research", support: ["architecture"] },
      12: { lead: "legal", support: [] },
    };

    const routing = taskMapping[priority as keyof typeof taskMapping] || {
      lead: "research",
      support: [],
    };

    const priorityNames: { [key: number]: string } = {
      1: "Competitive Analysis",
      2: "Data Scraping",
      3: "Gap Analysis",
      4: "Solution Documents",
      5: "Market Research",
      6: "Presentations",
      7: "LinkedIn Posts",
      8: "Website Optimization",
      9: "NDAs & Contracts",
      10: "Business Strategy",
      11: "Market & Tech Trends",
      12: "Regulatory Requirements",
    };

    const now = new Date();
    const createdAt = now.toISOString();
    const dueDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days out

    // Map team lead IDs to display names
    const teamNames: { [key: string]: string } = {
      research: "Research & Intelligence",
      architecture: "Chief Solution Architect",
      marketing: "Chief Marketing Officer",
      writer: "Principal Technical Writer",
      design: "Design Thinker",
      legal: "Chief Legal & Compliance",
      business: "Chief Business Officer",
    };

    // Create and store task
    const task = {
      id: taskId,
      title: priorityNames[priority] || `Priority ${priority}`,
      priority,
      status: "in-progress" as const,
      createdAt,
      updatedAt: createdAt,
      dueDate,
      details,
      context,
      assignedTeam: teamNames[routing.lead] || routing.lead,
      routing,
      stages: [
        { id: "research", name: "Research", agent: "Principal", status: "running" as const },
        { id: "critic", name: "Critic Review", agent: "Critic", status: "pending" as const },
        { id: "package", name: "Package Assembly", agent: "Elena", status: "pending" as const },
      ],
      criticFindings: 0,
      quality: "medium" as const,
      daysOpen: 0,
    };

    addTask(task);
    console.log(`[NGC] Task assigned: ${taskId} (${task.title})`);

    return NextResponse.json({
      taskId,
      status: "queued",
      message: "Task assigned to Elena for routing",
      routing,
      createdAt,
    });
  } catch (error) {
    console.error("[NGC] Error assigning task:", error);
    return NextResponse.json(
      { error: "Failed to assign task", details: String(error) },
      { status: 500 }
    );
  }
}
