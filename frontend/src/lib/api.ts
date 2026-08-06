import { getToken } from "./demo-auth";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export interface Project {
  _id: string;
  name: string;
  githubUrl: string;
  language?: string;
  framework?: string;
  status?: string;
  readmeDocs?: string;
}

export interface MissionSuggestion {
  category:
    | "System Design & Architecture"
    | "Full Stack Implementation"
    | "Vulnerability & Compliance"
    | "Testing & Validation";
  title: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  why?: string;
  recommendation?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  estimatedTime?: string;
}

export interface Mission {
  _id: string;
  projectId: string | Project;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "review_required" | "approved" | "rejected" | "completed";
  score: number;
  categoryScores: {
    Architecture: number;
    Security: number;
    Performance: number;
    Testing: number;
    Scalability: number;
    Maintainability: number;
  };
  suggestions: MissionSuggestion[];
  roadmap: {
    week: string;
    title: string;
    description: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

function getAuthHeaders(extraHeaders: Record<string, string> = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...extraHeaders,
  };
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export async function importRepository(url: string) {
  const response = await fetch(`${API_BASE_URL}/api/import`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error("Failed to import repository");
  }

  return response.json();
}

export async function runMission(
  prompt: string,
  agentType: string = "architect",
  projectId?: string,
  title?: string,
) {
  const apiKey = localStorage.getItem("OPENROUTER_API_KEY");
  const extra: Record<string, string> = {};
  if (apiKey) {
    extra["x-api-key"] = apiKey;
  }

  const response = await fetch(`${API_BASE_URL}/api/missions`, {
    method: "POST",
    headers: getAuthHeaders(extra),
    body: JSON.stringify({ prompt, agent_type: agentType, projectId, title }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Backend error response:", errorText);
    throw new Error("Failed to run mission");
  }

  return response.json();
}

export async function getProjects() {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}

export async function createProject(githubUrl: string, name?: string) {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ githubUrl, name }),
  });

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  return response.json();
}

export async function deleteProject(id: string) {
  const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete project");
  return response.json();
}


export async function getMissions(projectId?: string): Promise<Mission[]> {
  const url = projectId
    ? `${API_BASE_URL}/api/missions?projectId=${projectId}`
    : `${API_BASE_URL}/api/missions`;
  const response = await fetch(url, { headers: getAuthHeaders() });
  if (!response.ok) throw new Error("Failed to fetch missions");
  return response.json();
}

export async function getMissionById(missionId: string): Promise<Mission> {
  const response = await fetch(`${API_BASE_URL}/api/missions/${missionId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch mission details");
  return response.json();
}

export async function updateMissionStatus(
  missionId: string,
  status: Mission["status"],
): Promise<Mission> {
  const response = await fetch(`${API_BASE_URL}/api/missions/${missionId}/status`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Failed to update mission status");
  return response.json();
}

export async function createMockMission(): Promise<Mission> {
  const response = await fetch(`${API_BASE_URL}/api/missions/mock`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to create mock mission");
  return response.json();
}

export async function deleteMission(missionId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/missions/${missionId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to delete mission");
}

export async function saveReadmeDocs(projectId: string, markdown: string): Promise<void> {
  console.log("Saving docs for project", projectId);
  // Add a placeholder fetch for when the backend is ready
  // const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/readme`, {
  //   method: "PUT",
  //   headers: getAuthHeaders(),
  //   body: JSON.stringify({ readmeDocs: markdown }),
  // });
  // if (!response.ok) throw new Error("Failed to save documentation");
}
