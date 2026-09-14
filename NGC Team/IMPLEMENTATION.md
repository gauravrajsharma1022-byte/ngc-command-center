# NGC Command Center — Implementation Guide

## Overview

The NGC Command Center is a premium Next.js application built at `/internal/ngc-team` that serves as Gaurav's executive dashboard for managing the agentic consulting organization. It implements the organization structure defined in `NGC Team/README.md` and provides real-time task assignment, progress tracking, and output review/approval workflows.

## Architecture

### Frontend
- **Location:** `src/app/internal/ngc-team/page.tsx`
- **Styling:** `src/app/internal/ngc-team/ngc-team.module.css`
- **Framework:** React (Client Component)
- **Branding:** Northgate navy, cyan, Lexend typography

### Backend
- **Task Assignment:** `src/app/api/ngc-team/assign/route.ts` — Routes tasks to Elena (Chief of Staff)
- **Progress Tracking:** `src/app/api/ngc-team/runs/route.ts` — Lists pipeline status
- **Review Actions:** `src/app/api/ngc-team/review/route.ts` — Handles Approve/Reject/Rework

## Key Features

### 1. Dashboard View
- **Organization Status Grid:** All 7 principals + live status (Idle/Active/Working)
- **Quick Stats:** Active principals, in-progress tasks, pending reviews
- **Pipeline Progress:** Real-time tracking of task stages (Research → Critic → Package → Review)

### 2. Task Assignment
- **12 Priority Tasks:** Dropdown selection of all strategic priorities
- **Elena Routing:** Assigns task to Chief of Staff for optimal principal routing
- **Context Upload:** Attach reference files and detailed guidance

### 3. Review Queue
- **Pending Outputs:** Shows outputs awaiting your approval
- **Critic Findings:** Displays count of issues flagged by mandatory critic
- **Action Buttons:** Approve (publish) | Rework (re-run) | Reject (restart)

### 4. Navigation
- **Left Sidebar:** Quick access to all principals and sections
- **Northgate Branding:** Logo, navy + cyan color system
- **Responsive Design:** Works on desktop, tablet, and mobile

## How It Works

### 1. You Assign a Task
```
1. Click "+ New Task" or navigate to Task Assignment
2. Select priority task (1-12)
3. Enter task details and guidance
4. Upload context files (optional)
5. Click "Assign to Elena"
```

### 2. Elena Routes the Task
- Determines which principal owns it based on task type
- Sequences multi-team collaboration if needed
- Logs routing decision and expected timeline

### 3. Team Executes Pipeline
- **Principal Stage:** Team works on output (research, design, writing, etc.)
- **Critic Stage:** Mandatory adversarial reviewer checks work
  - Verifies facts
  - Checks tone and credibility
  - Flags any gaps or inconsistencies
  - **Cannot edit** — only writes findings
- **Package Stage:** Elena prepares final package for review

### 4. You Review & Approve
- Output appears in **Review Queue**
- You see:
  - Output title and excerpt
  - Critic's findings count
  - When it was submitted
- You choose one of three actions:

#### ✅ Approve
- Output is published/filed
- Moved to Output Library
- Marked as complete

#### 🔄 Rework
- Final stage re-runs with your feedback
- Principal(s) review your comment
- New version returned for re-approval
- Capped ~3 loops to prevent whack-a-mole

#### ❌ Reject
- Entire task returned to principal
- Your feedback attached
- Principal can restart or revise

## Task Priority Routing

| # | Task | Lead | Support | Stages |
|---|---|---|---|---|
| 1 | Competitive Analysis | Research & Intelligence | CMO | Research → Critic → Package |
| 2 | Data Scraping | Research & Intelligence | Legal | Scrape → Legal Review → Package |
| 3 | Gap Analysis | Chief Solution Architect | Research | Analysis → Regulatory → Package |
| 4 | Solution Documents | Chief Solution Architect | Tech Writer + Designer | Design → Regulatory → Doc → Package |
| 5 | Market Research | Research & Intelligence | Domain Principals | Research → Regional → Critic → Package |
| 6 | Presentations | CMO + Tech Writer | Designer + CSA | Strategy → Write → Design → Critic → Package |
| 7 | LinkedIn Posts | CMO | (Watchtower pipeline) | Scout → Strategist → Scribe → Sentinel → Mason → Warden |
| 8 | Website Optimization | CMO + Designer | Legal | Audit → UX → Compliance → Package |
| 9 | NDAs & Contracts | Chief Legal Officer | — | Draft → Review → Package |
| 10 | Business Strategy | CBO | Research + CSA | Strategy → Regulatory → Critic → Package |
| 11 | Market/Tech Trends | Research & Intelligence | CSA | Research → Trend Scout → Critic → Package |
| 12 | Regulatory Requirements | Chief Legal & Compliance | Domain Principals | Regulatory Intelligence → Analysis → Package |

## API Endpoints

### POST `/api/ngc-team/assign`
Assign a new task to Elena for routing.

```json
{
  "priority": 1,
  "details": "Analyze how McKinsey and Deloitte are positioning AI in telecom BSS/OSS",
  "context": "Focus on billing and customer management use cases"
}
```

Response:
```json
{
  "taskId": "task-1234567890-abc123",
  "status": "queued",
  "routing": {
    "lead": "research",
    "support": ["marketing"]
  },
  "createdAt": "2024-01-15T12:00:00Z"
}
```

### GET `/api/ngc-team/runs`
List all task runs with progress.

Query params:
- `status`: pending, in-progress, review, approved, rejected
- `taskId`: specific task ID
- `limit`: number to return (default 20)

Response:
```json
{
  "runs": [
    {
      "id": "t1",
      "title": "Competitive Analysis — McKinsey AI in Telecom",
      "status": "review",
      "assignedTo": "Dr. Amara Osei",
      "currentStage": "Package Assembly",
      "stages": [...]
    }
  ],
  "total": 2,
  "hasMore": false
}
```

### POST `/api/ngc-team/review`
Submit review decision (Approve/Reject/Rework).

```json
{
  "taskId": "task-1234567890-abc123",
  "action": "approve",
  "feedback": "Excellent analysis. One stat needs recency check but otherwise ready."
}
```

Response:
```json
{
  "taskId": "task-1234567890-abc123",
  "action": "approve",
  "status": "processed",
  "message": "Output approved. Publishing/filing...",
  "nextAction": "publish"
}
```

## Integration Points

### With Watchtower
- Watchtower (`/internal/watchtower`) is **specialized** for LinkedIn posts
- NGC Command Center (`/internal/ngc-team`) is **generalized** for all 12 priorities
- LinkedIn tasks (priority 7) can use Watchtower or NGC workflow

### With Agent System
- Each principal has a `.claude/agents/ngc-<name>.md` definition
- Elena orchestrates using `claude -p --agent ngc-<principal> --allowedTools <tools> -- "<prompt>"`
- Agents read shared reference materials fresh each run

### With CLI
- Agent invocations streamed via NDJSON for real-time progress
- Same pattern as Watchtower's `src/app/api/watchtower/run/route.ts`

## Styling & Branding

### Color System
- **Navy (#0c1945):** Primary text, headers, sidebar
- **Cyan (#05aff2):** Accents, interactive elements, status indicators
- **Blue (#3d5ad9):** Gradients, secondary elements
- **Success (#34d8a6):** Approve/completion status
- **Warning (#f59e0b):** Pending/caution status
- **Error (#ef4444):** Reject/error status

### Typography
- **Headings:** Lexend (font-weight 700-900), letter-spacing -0.5px
- **Body:** Inter (font-weight 400-600)
- **Sizes:** 42px h1 → 28px h2 → 20px h3 → 15px body
- **Readability:** WCAG AA contrast standards

### Spacing & Layout
- **Card gaps:** 20-24px
- **Section gaps:** 48px
- **Internal padding:** 24-28px
- **Border radius:** 8-12px
- **Responsive:** Breakpoints at 1200px and 768px

## Future Enhancements

### Real-Time Features
1. WebSocket progress updates (instead of polling)
2. Live agent status indicators (which agent is working now)
3. Notifications for critic findings
4. Email alerts when outputs ready for review

### Advanced Analytics
1. Task completion time dashboard
2. Critic finding patterns (what's commonly flagged)
3. Approval rate by principal/task type
4. Output quality metrics over time

### Workflow Automation
1. Auto-routing based on task type + principal capacity
2. Parallel execution when multi-team tasks allow
3. Scheduled task templates (weekly LinkedIn, monthly website audit)
4. Integration with calendar for deadline tracking

### Integration with Outputs
1. Direct view/edit of output files in the dashboard
2. Export outputs to Google Drive, SharePoint, etc.
3. Version history and comparison
4. Approval chain signatures/audit trail

## Troubleshooting

### Task Not Showing Progress
- Check `/api/ngc-team/runs` endpoint
- Verify agent execution logged to Claude CLI

### Critic Findings Not Appearing
- Critic must have **read-only access** (cannot edit)
- Findings written to separate output file
- Check agent definition for tool constraints

### Approval Button Inactive
- Output must be in "pending" status
- Must have passed through all pipeline stages
- Check review queue for the specific output

## File Structure

```
NGC Team/
├── README.md                    — Org structure & people
├── IMPLEMENTATION.md            — This file
├── roster/                      — (Future) Agent persona profiles
├── reference/                   — Shared knowledge base
│   ├── domain-knowledge/
│   ├── regional-briefs/
│   ├── regulatory-landscape.md
│   └── brand-voice.md
├── agents/                      — Reference mirrors of agent definitions
├── pipelines/                   — (Future) Stage-by-stage pipeline configs
└── outputs/                     — Task run outputs by date/slug

src/app/internal/ngc-team/
├── page.tsx                     — Main dashboard component
└── ngc-team.module.css          — Styling

src/app/api/ngc-team/
├── assign/route.ts              — Task assignment routing
├── runs/route.ts                — Pipeline progress tracking
└── review/route.ts              — Approve/Reject/Rework actions
```

## Getting Started

1. **Start dev server:**
   ```bash
   cd northgate
   npm run dev
   ```

2. **Open Command Center:**
   - Navigate to `http://localhost:3000/internal/ngc-team`
   - You should see the dashboard with 7 principals

3. **Assign a test task:**
   - Click "+ New Task"
   - Select "1. Competitive Analysis"
   - Enter task details
   - Click "Assign to Elena"

4. **Monitor progress:**
   - Task should appear in "In Progress" section
   - Watch stages as they complete

5. **Review output:**
   - When ready, task appears in "Review Queue"
   - Click Approve/Rework/Reject

## Support & Documentation

- **Org Structure:** See `NGC Team/README.md`
- **Agent Definitions:** See `.claude/agents/ngc-*.md`
- **Brand Guidelines:** See Northgate brand guide (public branding folder)
- **Reference Materials:** See `NGC Team/reference/` folder
