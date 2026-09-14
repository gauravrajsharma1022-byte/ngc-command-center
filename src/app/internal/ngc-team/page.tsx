"use client";

import { useState, useEffect } from "react";
import styles from "./ngc-team.module.css";

interface Task {
  id: string;
  title: string;
  priority: number;
  status: "in-progress" | "review" | "approved" | "rejected";
  createdAt: string;
  assignedTeam: string;
  routing: { lead: string };
  daysOpen?: number;
  dueDate?: string;
  criticFindings?: number;
  quality?: "low" | "medium" | "high";
}

interface Principal {
  id: string;
  name: string;
  role: string;
  icon: string;
}

const PRINCIPALS: Principal[] = [
  { id: "amara", name: "Dr. Amara Osei", role: "Chief Research & Intelligence", icon: "🔍" },
  { id: "maya", name: "Maya Chen", role: "Chief Marketing Officer", icon: "📢" },
  { id: "rajiv", name: "Rajiv Malhotra", role: "Chief Solution Architect", icon: "🏗️" },
  { id: "isabella", name: "Isabella Rossi", role: "Principal Design Thinker", icon: "✨" },
  { id: "robert", name: "Robert Hayes", role: "Principal Technical Writer", icon: "✍️" },
  { id: "jonathan", name: "Jonathan Pierce", role: "Chief Business Officer", icon: "💼" },
  { id: "layla", name: "Layla Haddad", role: "Chief Legal & Compliance", icon: "⚖️" },
];

export default function CommandCenter() {
  const [view, setView] = useState<"executive" | "capacity" | "pipeline" | "risks" | "assign">("executive");
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [taskForm, setTaskForm] = useState({ priority: "1", details: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/ngc-team/runs")
      .then((res) => res.json())
      .then((data) => {
        if (data.runs) {
          const tasksWithDaysOpen = data.runs.map((t: Task) => ({
            ...t,
            daysOpen: Math.ceil(
              (new Date().getTime() - new Date(t.createdAt).getTime()) / (1000 * 60 * 60 * 24)
            ),
          }));
          setAllTasks(tasksWithDaysOpen);
        }
      });
  }, []);

  // KPI Calculations
  const stats = {
    totalTasks: allTasks.length,
    inProgress: allTasks.filter((t) => t.status === "in-progress").length,
    underReview: allTasks.filter((t) => t.status === "review").length,
    completed: allTasks.filter((t) => t.status === "approved").length,
    rejected: allTasks.filter((t) => t.status === "rejected").length,
    avgCycleDays:
      allTasks.length > 0 ? Math.round(allTasks.reduce((sum, t) => sum + (t.daysOpen || 0), 0) / allTasks.length) : 0,
    atRisk: allTasks.filter((t) => (t.daysOpen || 0) > 5 && t.status !== "approved").length,
    avgCriticFindings:
      allTasks.filter((t) => t.criticFindings).length > 0
        ? Math.round(
            allTasks.filter((t) => t.criticFindings).reduce((sum, t) => sum + (t.criticFindings || 0), 0) /
              allTasks.filter((t) => t.criticFindings).length
          )
        : 0,
  };

  const teamMetrics = PRINCIPALS.map((p) => {
    const teamTasks = allTasks.filter(
      (t) => t.assignedTeam.toLowerCase().includes(p.role.toLowerCase().split(" ")[p.role.toLowerCase().split(" ").length - 1]) ||
      t.routing?.lead === p.id
    );
    return {
      name: p.role,
      icon: p.icon,
      total: teamTasks.length,
      inProgress: teamTasks.filter((t) => t.status === "in-progress").length,
      underReview: teamTasks.filter((t) => t.status === "review").length,
      completed: teamTasks.filter((t) => t.status === "approved").length,
      avgDays: teamTasks.length > 0 ? Math.round(teamTasks.reduce((sum, t) => sum + (t.daysOpen || 0), 0) / teamTasks.length) : 0,
      healthScore: teamTasks.length === 0 ? 100 : Math.max(0, 100 - teamTasks.filter((t) => (t.daysOpen || 0) > 5).length * 15),
    };
  });

  const handleAssignTask = async () => {
    if (!taskForm.details.trim()) {
      alert("Please enter task details");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/ngc-team/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priority: parseInt(taskForm.priority),
          details: taskForm.details,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ Task assigned to ${data.routing.lead.toUpperCase()}`);
        setTaskForm({ priority: "1", details: "" });
        setTimeout(() => setMessage(""), 5000);
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      alert("Error: " + String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <div className={styles.logoMark}>N</div>
          <div className={styles.logoText}>
            <div className={styles.logoMain}>NGC Command</div>
            <div className={styles.logoSub}>Executive Center</div>
          </div>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navSection}>
            <div className={styles.navLabel}>DECISION VIEWS</div>
            {[
              { id: "executive", label: "📊 Executive Summary", icon: "📊" },
              { id: "capacity", label: "👥 Team Capacity", icon: "👥" },
              { id: "pipeline", label: "🔄 Pipeline (Kanban)", icon: "🔄" },
              { id: "risks", label: "⚠️ Blockers & Risks", icon: "⚠️" },
              { id: "assign", label: "➕ Assign Work", icon: "➕" },
            ].map((item) => (
              <div
                key={item.id}
                className={`${styles.navItem} ${view === item.id ? styles.active : ""}`}
                onClick={() => setView(item.id as any)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </nav>
      </aside>

      <main className={styles.main}>
        {/* EXECUTIVE SUMMARY */}
        {view === "executive" && (
          <>
            <div className={styles.header}>
              <div>
                <h1 className={styles.title}>Executive Summary</h1>
                <p className={styles.subtitle}>Real-time organizational health & decision queue</p>
              </div>
            </div>

            {/* KEY METRICS */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>📈 Key Performance Indicators</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                <MetricCard label="Total Tasks" value={stats.totalTasks} color="#3b82f6" />
                <MetricCard label="In Progress" value={stats.inProgress} color="#f59e0b" />
                <MetricCard label="Under Review" value={stats.underReview} color="#8b5cf6" />
                <MetricCard label="Completed" value={stats.completed} color="#34d8a6" />
                <MetricCard label="Rejected" value={stats.rejected} color="#ef4444" />
                <MetricCard label="Avg Cycle Days" value={stats.avgCycleDays} color="#0c1945" />
                <MetricCard label="At Risk (>5 days)" value={stats.atRisk} color="#ef4444" highlight />
                <MetricCard label="Avg Critic Findings" value={stats.avgCriticFindings} color="#f59e0b" />
              </div>
            </section>

            {/* TEAM HEALTH SCORECARD */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>🏢 Team Health Dashboard</h2>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ background: "#0c1945", color: "white" }}>
                      <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>Team</th>
                      <th style={{ padding: "12px", textAlign: "center" }}>Tasks</th>
                      <th style={{ padding: "12px", textAlign: "center" }}>In Progress</th>
                      <th style={{ padding: "12px", textAlign: "center" }}>Review</th>
                      <th style={{ padding: "12px", textAlign: "center" }}>Completed</th>
                      <th style={{ padding: "12px", textAlign: "center" }}>Avg Days</th>
                      <th style={{ padding: "12px", textAlign: "center" }}>Health</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMetrics.map((team, idx) => (
                      <tr key={idx} style={{ background: idx % 2 === 0 ? "#f8fafc" : "white", borderBottom: "1px solid #e0e7ff" }}>
                        <td style={{ padding: "12px", fontWeight: 600 }}>{team.icon} {team.name}</td>
                        <td style={{ padding: "12px", textAlign: "center", fontWeight: 600 }}>{team.total}</td>
                        <td style={{ padding: "12px", textAlign: "center", color: "#f59e0b", fontWeight: 600 }}>{team.inProgress}</td>
                        <td style={{ padding: "12px", textAlign: "center", color: "#8b5cf6", fontWeight: 600 }}>{team.underReview}</td>
                        <td style={{ padding: "12px", textAlign: "center", color: "#34d8a6", fontWeight: 600 }}>{team.completed}</td>
                        <td style={{ padding: "12px", textAlign: "center", color: "#0c1945", fontWeight: 600 }}>{team.avgDays}d</td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          <HealthBar score={team.healthScore} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* DECISION QUEUE */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>🎯 Your Decision Queue</h2>
              <div style={{ display: "grid", gap: "12px" }}>
                {stats.underReview > 0 && (
                  <AlertBox
                    icon="✅"
                    title="Pending Approvals"
                    desc={`${stats.underReview} deliverables awaiting your review & decision`}
                    color="#3b82f6"
                    action="Review Now"
                  />
                )}
                {stats.atRisk > 0 && (
                  <AlertBox
                    icon="⚠️"
                    title="Tasks at Risk"
                    desc={`${stats.atRisk} tasks have been in-progress for >5 days. Check for blockers.`}
                    color="#ef4444"
                    action="Investigate"
                  />
                )}
                {stats.rejected > 0 && (
                  <AlertBox
                    icon="↻"
                    title="Rework Queue"
                    desc={`${stats.rejected} tasks rejected. Waiting for principal re-work.`}
                    color="#f59e0b"
                    action="Track Progress"
                  />
                )}
                {stats.inProgress > 0 && (
                  <AlertBox
                    icon="🔄"
                    title="In-Flight Work"
                    desc={`${stats.inProgress} tasks actively being worked. Avg ${stats.avgCycleDays} days in pipeline.`}
                    color="#0c1945"
                  />
                )}
              </div>
            </section>
          </>
        )}

        {/* TEAM CAPACITY VIEW */}
        {view === "capacity" && (
          <>
            <div className={styles.header}>
              <h1 className={styles.title}>Team Capacity & Workload</h1>
              <p className={styles.subtitle}>Resource planning and utilization</p>
            </div>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>🏢 Team Workload Distribution</h2>
              {teamMetrics.map((team) => (
                <div key={team.name} style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontWeight: 600, color: "#0c1945" }}>{team.icon} {team.name}</span>
                    <span style={{ fontSize: "12px", color: "#5f6f95" }}>
                      {team.total} tasks • Health: {team.healthScore}%
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
                    <ProgressBar label="In Progress" value={team.inProgress} max={Math.max(5, team.total)} color="#f59e0b" />
                    <ProgressBar label="Review" value={team.underReview} max={Math.max(5, team.total)} color="#8b5cf6" />
                    <ProgressBar label="Completed" value={team.completed} max={Math.max(5, team.total)} color="#34d8a6" />
                    <ProgressBar label="Capacity" value={team.total} max={10} color="#0c1945" />
                  </div>
                </div>
              ))}
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>⚖️ Bottleneck Analysis</h2>
              {teamMetrics
                .filter((t) => t.healthScore < 70)
                .map((team) => (
                  <div
                    key={team.name}
                    style={{
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: "8px",
                      padding: "16px",
                      marginBottom: "12px",
                    }}
                  >
                    <div style={{ fontWeight: 600, color: "#7f1d1d", marginBottom: "4px" }}>
                      ⚠️ {team.name} — Health Score: {team.healthScore}%
                    </div>
                    <div style={{ fontSize: "13px", color: "#991b1b" }}>
                      {team.inProgress} tasks in progress, avg {team.avgDays} days in cycle. Recommend: Prioritize completion or add support.
                    </div>
                  </div>
                ))}
            </section>
          </>
        )}

        {/* KANBAN PIPELINE */}
        {view === "pipeline" && (
          <>
            <div className={styles.header}>
              <h1 className={styles.title}>Task Pipeline (Kanban View)</h1>
              <p className={styles.subtitle}>Visual workflow of all active work</p>
            </div>

            <section className={styles.section}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                <KanbanColumn title="📌 Assigned" color="#0c1945" tasks={allTasks.filter((t) => t.status === "in-progress")} />
                <KanbanColumn title="👀 Under Review" color="#8b5cf6" tasks={allTasks.filter((t) => t.status === "review")} />
                <KanbanColumn title="✅ Approved" color="#34d8a6" tasks={allTasks.filter((t) => t.status === "approved")} />
                <KanbanColumn title="❌ Rejected" color="#ef4444" tasks={allTasks.filter((t) => t.status === "rejected")} />
              </div>
            </section>
          </>
        )}

        {/* RISKS & BLOCKERS */}
        {view === "risks" && (
          <>
            <div className={styles.header}>
              <h1 className={styles.title}>Blockers & Risks</h1>
              <p className={styles.subtitle}>Issues requiring executive attention</p>
            </div>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>⏱️ Tasks Overdue - 7+ Days</h2>
              <div style={{ display: "grid", gap: "12px" }}>
                {allTasks
                  .filter((t) => (t.daysOpen || 0) > 7 && t.status !== "approved")
                  .map((task) => (
                    <div
                      key={task.id}
                      style={{
                        background: "#fef2f2",
                        border: "2px solid #ef4444",
                        borderRadius: "8px",
                        padding: "16px",
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        gap: "16px",
                      }}
                    >
                      <div>
                        <h3 style={{ margin: "0 0 4px 0", color: "#7f1d1d", fontWeight: 600 }}>⏰ {task.title}</h3>
                        <div style={{ fontSize: "13px", color: "#991b1b" }}>
                          {task.daysOpen} days in "{task.status}" • Assigned to: {task.assignedTeam}
                        </div>
                      </div>
                      <button
                        style={{
                          padding: "8px 12px",
                          background: "#ef4444",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Escalate
                      </button>
                    </div>
                  ))}
                {allTasks.filter((t) => (t.daysOpen || 0) > 7 && t.status !== "approved").length === 0 && (
                  <p style={{ color: "#5f6f95", textAlign: "center", padding: "20px" }}>✅ No overdue tasks</p>
                )}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>📝 Critic Concerns (Quality Issues)</h2>
              <div style={{ display: "grid", gap: "12px" }}>
                {allTasks
                  .filter((t) => t.criticFindings && t.criticFindings > 0)
                  .map((task) => (
                    <div
                      key={task.id}
                      style={{
                        background: "#fffbeb",
                        border: "1px solid #fbbf24",
                        borderRadius: "8px",
                        padding: "16px",
                      }}
                    >
                      <div style={{ fontWeight: 600, color: "#92400e", marginBottom: "4px" }}>
                        ⚠️ {task.title}
                      </div>
                      <div style={{ fontSize: "13px", color: "#b45309" }}>
                        {task.criticFindings} finding{task.criticFindings !== 1 ? "s" : ""} from critic review • Quality: {task.quality}
                      </div>
                    </div>
                  ))}
                {allTasks.filter((t) => t.criticFindings && t.criticFindings > 0).length === 0 && (
                  <p style={{ color: "#5f6f95", textAlign: "center", padding: "20px" }}>✅ All outputs passing quality review</p>
                )}
              </div>
            </section>
          </>
        )}

        {/* ASSIGN TASK */}
        {view === "assign" && (
          <>
            <div className={styles.header}>
              <h1 className={styles.title}>Assign New Work</h1>
              <p className={styles.subtitle}>Route tasks to Elena (Chief of Staff)</p>
            </div>

            <section className={styles.section}>
              <div style={{ background: "white", border: "1px solid #e0e7ff", borderRadius: "8px", padding: "28px", maxWidth: "600px" }}>
                {message && (
                  <div style={{ background: "rgba(52, 216, 166, 0.15)", border: "1px solid #34d8a6", borderRadius: "8px", padding: "16px", marginBottom: "20px", color: "#1e9874", fontWeight: "600" }}>
                    {message}
                  </div>
                )}

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#0c1945" }}>Task Type</label>
                  <select value={taskForm.priority} onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })} style={{ width: "100%", padding: "10px", border: "1px solid #e0e7ff", borderRadius: "6px" }}>
                    <option value="1">Competitive Analysis</option>
                    <option value="5">Market Research</option>
                    <option value="4">Solution Documents</option>
                    <option value="6">Presentations</option>
                    <option value="10">Business Strategy</option>
                  </select>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "#0c1945" }}>Description & Scope</label>
                  <textarea value={taskForm.details} onChange={(e) => setTaskForm({ ...taskForm, details: e.target.value })} placeholder="What needs to be done?" style={{ width: "100%", padding: "10px", border: "1px solid #e0e7ff", borderRadius: "6px", minHeight: "100px", fontFamily: "inherit" }} />
                </div>

                <button onClick={handleAssignTask} disabled={isLoading} style={{ width: "100%", padding: "12px", background: "#05aff2", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}>
                  {isLoading ? "Assigning..." : "Assign to Elena"}
                </button>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

// HELPER COMPONENTS
function MetricCard({ label, value, color, highlight }: any) {
  return (
    <div style={{ background: "white", border: highlight ? `2px solid ${color}` : `1px solid #e0e7ff`, borderRadius: "8px", padding: "20px", textAlign: "center" }}>
      <div style={{ fontSize: "32px", fontWeight: 700, color, marginBottom: "4px" }}>{value}</div>
      <div style={{ fontSize: "12px", fontWeight: 600, color: "#5f6f95", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
    </div>
  );
}

function HealthBar({ score }: { score: number }) {
  const color = score >= 80 ? "#34d8a6" : score >= 60 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ display: "inline-block", padding: "4px 8px", background: color + "20", borderRadius: "4px", fontWeight: 600, color }}>
      {score}%
    </div>
  );
}

function ProgressBar({ label, value, max, color }: any) {
  return (
    <div>
      <div style={{ fontSize: "11px", fontWeight: 600, color: "#5f6f95", marginBottom: "4px" }}>{label}</div>
      <div style={{ background: "#f3f4f6", borderRadius: "4px", height: "24px", overflow: "hidden" }}>
        <div style={{ background: color, height: "100%", width: `${(value / max) * 100}%`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 600 }}>
          {value > 0 && value}
        </div>
      </div>
    </div>
  );
}

function AlertBox({ icon, title, desc, color, action }: any) {
  return (
    <div style={{ background: color + "15", border: `1px solid ${color}`, borderRadius: "8px", padding: "16px", display: "grid", gridTemplateColumns: "1fr auto", gap: "16px", alignItems: "center" }}>
      <div>
        <h3 style={{ margin: "0 0 4px 0", color: color, fontWeight: 600 }}>
          {icon} {title}
        </h3>
        <p style={{ margin: 0, fontSize: "13px", color: "#5f6f95" }}>{desc}</p>
      </div>
      {action && (
        <button style={{ padding: "8px 16px", background: color, color: "white", border: "none", borderRadius: "4px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
          {action}
        </button>
      )}
    </div>
  );
}

function KanbanColumn({ title, color, tasks }: any) {
  return (
    <div style={{ background: "#f8fafc", borderRadius: "8px", border: `2px solid ${color}`, padding: "16px" }}>
      <h3 style={{ margin: "0 0 16px 0", color, fontWeight: 600, fontSize: "14px" }}>
        {title} ({tasks.length})
      </h3>
      <div style={{ display: "grid", gap: "12px" }}>
        {tasks.map((task: Task) => (
          <div key={task.id} style={{ background: "white", border: "1px solid #e0e7ff", borderRadius: "6px", padding: "12px" }}>
            <div style={{ fontWeight: 600, fontSize: "13px", color: "#0c1945", marginBottom: "4px" }}>{task.title}</div>
            <div style={{ fontSize: "11px", color: "#5f6f95" }}>
              {task.assignedTeam} • {task.daysOpen}d
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
