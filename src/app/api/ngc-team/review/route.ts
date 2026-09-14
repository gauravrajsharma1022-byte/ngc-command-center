import { NextRequest, NextResponse } from "next/server";
import { updateTaskStatus, updateTask, getTasks } from "../store";

export const runtime = "nodejs";

interface ReviewAction {
  taskId: string;
  action: "approve" | "reject" | "rework";
  feedback?: string;
}

/**
 * POST /api/ngc-team/review
 *
 * Submits review decision for a task output.
 * Actions:
 * - approve: Publish/file the output
 * - reject: Send back to principal with feedback
 * - rework: Re-run final stage with feedback (capped ~3 loops)
 *
 * Request body:
 * - taskId: task to review
 * - action: approve | reject | rework
 * - feedback: optional feedback for reject/rework
 *
 * Response:
 * - status: action completed
 * - message: status description
 * - nextAction: what happens next
 */
export async function POST(req: NextRequest) {
  try {
    const body: ReviewAction = await req.json();
    const { taskId, action, feedback } = body;

    if (!taskId || !action) {
      return NextResponse.json(
        { error: "taskId and action are required" },
        { status: 400 }
      );
    }

    if (!["approve", "reject", "rework"].includes(action)) {
      return NextResponse.json(
        { error: "action must be approve, reject, or rework" },
        { status: 400 }
      );
    }

    let nextAction = "";
    let message = "";

    let newTaskStatus: "approved" | "rejected" | "in-progress" = "in-progress";

    switch (action) {
      case "approve":
        message = "Output approved. Publishing/filing...";
        nextAction = "publish";
        newTaskStatus = "approved";
        updateTaskStatus(taskId, "approved");
        console.log(`[NGC] Task ${taskId} APPROVED`);
        break;

      case "reject":
        message = "Output rejected. Returning to principal with feedback.";
        nextAction = "restart";
        newTaskStatus = "rejected";
        updateTaskStatus(taskId, "rejected");
        console.log(`[NGC] Task ${taskId} REJECTED`);
        if (feedback) {
          console.log(`  Feedback: ${feedback}`);
        }
        break;

      case "rework":
        message = "Rework requested. Re-running final stage with feedback...";
        nextAction = "rework";
        console.log(`[NGC] Task ${taskId} REWORK REQUESTED`);
        if (feedback) {
          console.log(`  Feedback: ${feedback}`);
        }
        break;
    }

    return NextResponse.json({
      taskId,
      action,
      status: "processed",
      message,
      nextAction,
      newTaskStatus,
      processedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[NGC] Error processing review:", error);
    return NextResponse.json(
      { error: "Failed to process review", details: String(error) },
      { status: 500 }
    );
  }
}
