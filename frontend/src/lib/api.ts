const API_BASE_URL = "http://localhost:3001";

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

export async function runMission(prompt: string, agentType: string = "architect") {
  const response = await fetch(`${API_BASE_URL}/api/missions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, agent_type: agentType }),
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
