#!/usr/bin/env node

/**
 * NGC TEAM ORCHESTRATOR
 *
 * Reads tasks from Airtable, invokes Claude agents, updates results.
 * Run: node orchestrator.js
 *
 * Free hosting options:
 * - Run locally on your machine
 * - GitHub Actions (free CI/CD)
 * - Replit (free tier)
 */

const http = require("http");

// ==========================================
// CONFIGURATION (Set these from Airtable)
// ==========================================
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN || "YOUR_API_TOKEN_HERE";
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || "app...";
const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID || "tbl...";

const AIRTABLE_API = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;

// ==========================================
// STEP 1: FETCH TASKS FROM AIRTABLE
// ==========================================
async function fetchTasksFromAirtable() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.airtable.com",
      path: `/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}?filterByFormula={status}="in-progress"`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
    };

    http
      .request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const result = JSON.parse(data);
            resolve(result.records || []);
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", reject)
      .end();
  });
}

// ==========================================
// STEP 2: INVOKE CLAUDE AGENT FOR TASK
// ==========================================
async function invokeClaudeAgent(task) {
  const taskFields = task.fields;
  const priority = taskFields.priority;

  // Map priority to agent persona
  const agentMap = {
    1: "Competitive intelligence agent",
    2: "Data analyst agent",
    3: "Solution architect agent",
    4: "Solution architect agent",
    5: "Market researcher agent",
    6: "Marketing strategist agent",
    7: "LinkedIn content strategist",
    8: "Web optimization agent",
    9: "Legal contracts agent",
    10: "Business strategy agent",
    11: "Trend analyst agent",
    12: "Regulatory compliance agent",
  };

  const agent = agentMap[priority] || "Research agent";
  const prompt = `
You are a ${agent} for Northgate Consulting.

Task: ${taskFields.title}
Priority: ${priority}
Details: ${taskFields.details}

Produce output that is:
1. Ready for executive review
2. Professionally formatted
3. Includes key findings/recommendations
4. 300-500 words

Output:`;

  console.log(`[${new Date().toISOString()}] Invoking Claude for: ${taskFields.title}`);

  // Use claude CLI (installed locally)
  const { execSync } = require("child_process");
  try {
    const output = execSync(`echo "${prompt.replace(/"/g, '\\"')}" | claude`, {
      encoding: "utf-8",
      maxBuffer: 10 * 1024 * 1024,
    });
    return output.trim();
  } catch (error) {
    console.error("Claude invocation error:", error.message);
    return `Error: ${error.message}`;
  }
}

// ==========================================
// STEP 3: UPDATE TASK IN AIRTABLE
// ==========================================
async function updateTaskInAirtable(taskId, updates) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ fields: updates });

    const options = {
      hostname: "api.airtable.com",
      path: `/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}/${taskId}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    http
      .request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", reject)
      .end(body);
  });
}

// ==========================================
// ORCHESTRATOR MAIN LOOP
// ==========================================
async function runOrchestrator() {
  console.log("\n" + "=".repeat(60));
  console.log("NGC TEAM ORCHESTRATOR - STARTING");
  console.log("=".repeat(60));
  console.log(`[${new Date().toISOString()}] Connecting to Airtable...`);

  if (AIRTABLE_TOKEN === "YOUR_API_TOKEN_HERE") {
    console.error("\n❌ ERROR: Set AIRTABLE_TOKEN environment variable");
    console.error("   export AIRTABLE_TOKEN='your_token_here'");
    process.exit(1);
  }

  try {
    // Step 1: Fetch tasks
    const tasks = await fetchTasksFromAirtable();
    console.log(`[${new Date().toISOString()}] Found ${tasks.length} in-progress task(s)\n`);

    if (tasks.length === 0) {
      console.log("✓ No tasks to process. Waiting for new assignments.");
      return;
    }

    // Step 2: Process each task
    for (const task of tasks) {
      const taskId = task.id;
      const taskFields = task.fields;

      console.log(`\n📋 Processing: ${taskFields.title}`);
      console.log(`   Team: ${taskFields.assignedTeam}`);
      console.log(`   Status: ${taskFields.status}`);

      // Invoke Claude agent
      console.log(`   ⏳ Invoking agent...`);
      const agentOutput = await invokeClaudeAgent(task);

      // Update task with output and move to review
      console.log(`   ✅ Agent complete. Updating task...`);
      await updateTaskInAirtable(taskId, {
        status: "review",
        agentOutput: agentOutput,
        currentStage: "Ready for Approval",
        lastUpdated: new Date().toISOString(),
      });

      console.log(`   ✓ Task moved to REVIEW (waiting for chairman approval)`);
    }

    console.log(`\n[${new Date().toISOString()}] Orchestrator cycle complete`);
  } catch (error) {
    console.error("\n❌ Orchestrator error:", error.message);
    console.error(error);
  }

  console.log("=".repeat(60) + "\n");
}

// ==========================================
// RUN ORCHESTRATOR
// ==========================================
runOrchestrator();
