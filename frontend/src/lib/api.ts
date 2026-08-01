const API_BASE_URL = "http://localhost:3001";

export interface Project {
  _id: string;
  name: string;
  githubUrl: string;
  language?: string;
  framework?: string;
  status?: string;
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

export async function importRepository(url: string) {
  const response = await fetch(`${API_BASE_URL}/api/import`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["x-api-key"] = apiKey;
  }

  const response = await fetch(`${API_BASE_URL}/api/missions`, {
    method: "POST",
    headers,
    body: JSON.stringify({ prompt, agent_type: agentType, projectId, title }),
  });

  if (!response.ok) {
    throw new Error("Failed to run mission");
  }

  return response.json();
}

export async function getProjects() {
  const response = await fetch(`${API_BASE_URL}/api/projects`);

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}

export async function createProject(githubUrl: string, name?: string) {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ githubUrl, name }),
  });

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  return response.json();
}

export async function getMissions(projectId?: string): Promise<Mission[]> {
  const url = projectId
    ? `${API_BASE_URL}/api/missions?projectId=${projectId}`
    : `${API_BASE_URL}/api/missions`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch missions");
  return response.json();
}

export async function getMissionById(missionId: string): Promise<Mission> {
  const response = await fetch(`${API_BASE_URL}/api/missions/${missionId}`);
  if (!response.ok) throw new Error("Failed to fetch mission details");
  return response.json();
}

export async function updateMissionStatus(
  missionId: string,
  status: Mission["status"],
): Promise<Mission> {
  const response = await fetch(`${API_BASE_URL}/api/missions/${missionId}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Failed to update mission status");
  return response.json();
}

export async function createMockMission(): Promise<Mission> {
  const response = await fetch(`${API_BASE_URL}/api/missions/mock`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("Failed to create mock mission");
  return response.json();
}

export async function deleteMission(missionId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/missions/${missionId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete mission");
}
