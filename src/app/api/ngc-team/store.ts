// In-memory task storage for NGC Team
// (Ephemeral per dev server restart; in production, use a real database)

interface Task {
  id: string;
  title: string;
  priority: number;
  status: "in-progress" | "review" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  details: string;
  context?: string;
  assignedTeam: string;
  assignedTo?: string;
  routing: { lead: string; support: string[] };
  stages: Array<{
    id: string;
    name: string;
    agent: string;
    status: "pending" | "running" | "done";
  }>;
  criticFindings?: number;
  quality?: "low" | "medium" | "high";
  daysOpen?: number;
}

const store: {
  tasks: Task[];
  reviewItems: any[];
} = {
  tasks: [],
  reviewItems: [],
};

export function addTask(task: Task) {
  store.tasks.push(task);
}

export function getTasks() {
  return store.tasks;
}

export function getTask(taskId: string) {
  return store.tasks.find((t) => t.id === taskId);
}

export function updateTask(taskId: string, updates: Partial<Task>) {
  const task = getTask(taskId);
  if (task) {
    Object.assign(task, { ...updates, updatedAt: new Date().toISOString() });
  }
  return task;
}

export function updateTaskStatus(taskId: string, newStatus: Task["status"]) {
  return updateTask(taskId, { status: newStatus });
}

export function getTasksByTeam(teamLead: string) {
  return store.tasks.filter((t) => t.assignedTeam === teamLead || t.routing.lead === teamLead);
}

export function getTasksByStatus(status: Task["status"]) {
  return store.tasks.filter((t) => t.status === status);
}

export function addReviewItem(item: any) {
  store.reviewItems.push(item);
}

export function updateReviewItem(itemId: string, updates: any) {
  const item = store.reviewItems.find((r) => r.id === itemId);
  if (item) {
    Object.assign(item, updates);
  }
  return item;
}
